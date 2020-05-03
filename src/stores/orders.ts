import * as _ from 'lodash';
import { observable, action } from 'mobx';
import { callApi } from '../utils/apiAxios';
import { services } from '../config/routes';

const prepareDataForFuckupPut: Fuckup.PrepareDataForServer = (data) => {
    let fittings: Fuckup.Fitting[] = [];
    let items: Fuckup.Item[] = [];
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
        items,
        customer: data.customer,
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
            method: 'GET',
            url: services.orders
        },
        () => { this.isFetching = true; },
        this._onSuccess,
        this._onError);
    }

    @action
    fetchCustomerOrders: Fetch<List> = () => {
        this.error = null;

        return callApi({
                method: 'GET',
                url: services.customerOrders,
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
            data: prepareDataForFuckupPut(order)
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

    @action
    deleteOrder = (orderId: number) => {
        return callApi({
            url: `${services.orders}/${orderId}`,
            method: 'DELETE'
        },
        () => { this.isFetching = true; },
        (response) => {
            this.orders =
            observable.array<OrderList.OrderItem>(this.orders.filter(order => order.orderId !== orderId));
            this.isFetching = false;
        },
        this._onError
    );
    }

    @action
    confirmCustomer = (orderId: number, customerId: number) => {
        return callApi({
                url: `${services.customers}/confirm/${customerId}`,
                method: 'PUT'
            },
            () => { this.isFetching = true; },
            () => {
                const currentOrderIndex = this.orders.findIndex(item => item.orderId === orderId);
                if (currentOrderIndex !== -1) {
                    this.orders[currentOrderIndex] = {
                        ...this.orders[currentOrderIndex],
                        // @ts-ignore
                        customer: { ...this.orders[currentOrderIndex].customer, isConfirmed: true },
                    };
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
