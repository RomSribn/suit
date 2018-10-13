import * as _ from 'lodash';
import { observable, action } from 'mobx';
import { callApi } from '../utils/apiAxios';
import { services } from '../config/routes';

namespace Fucking {
    export interface Item {
        additionalFabric?: { ourCode: string; };
        design: {
            ourCode: string;
            value: string;
        };
    }

    export interface Fitting {
        ourCode: string;
        value: string;
    }

    export interface PutData {
        statusId: number;
        fittings: Fitting[];
        mainFabric: { ourCode: string; };
        items: Item[];
    }

    export type PrepareDataForPut = (data: OrderList.OrderItem) => Fucking.PutData;
}

const prepareDataForFuckingPut: Fucking.PrepareDataForPut = (data) => {
    let fittings: Fucking.Fitting[] = [];
    let items: Fucking.Item[] = [];
    _.forIn(data.garments, (garment) => {
        fittings = _.map(garment.fittings, (fittingItem) => ({
            ourCode: fittingItem.fitting.our_code,
            value: fittingItem.value
        }));

        items = _.map(garment.items, (garmentItem) => ({
            additionalFabric: garmentItem.additionalFabric && {
                ourCode: garmentItem.additionalFabric.our_code
            },
            design: {
                ourCode: garmentItem.design.our_code,
                value: garmentItem.value
            }
        }));
    });
    return {
        fittings,
        statusId: data.status.statusId,
        mainFabric: { ourCode: data.garments.shirt.mainFabric.our_code },
        items
    };
};

type List = OrderList.ServerData.List;
type Fetch<Data> = () => Promise<void | Axios.Response<Data>>;

class OrdersStore implements OrderList.IOrderStore {
    @observable isFetching = false;
    @observable error: Error | null = null;

    @observable orders = observable.array<OrderList.OrderItem>();

    @action
    fetch: Fetch<List> = () => {
        this.error = null;

        return callApi({
            method: 'get',
            url: services.orders
        },
        () => { this.isFetching = true; },
        this._onSuccess,
        this._onError);
    }

    @action
    updateOrder = (order: OrderList.OrderItem) => {
        return callApi({
            method: 'PUT',
            url: `${services.orders}/${order.orderId}`,
            data: prepareDataForFuckingPut(order)
        },
        () => { this.isFetching = true; },
        () => {
            const currentOrderIndex = this.orders.findIndex(item => item.orderId === order.orderId);
            if (currentOrderIndex !== -1) {
                this.orders[currentOrderIndex] = order;
            }
            this.isFetching = false;
        },
        this._onError

    );
    }

    _onSuccess = (data: List) => {
        this.orders = observable.array(data.items);
        this.isFetching = false;
    }
    _onError = (e: Error) => {
        this.error = e;
        this.isFetching = false;
    }

}

const instanse: OrdersStore = new OrdersStore();

export {
    instanse as ordersStore,
};
