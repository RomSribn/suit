import { observable, action } from 'mobx';
import { callApi } from '../utils/apiAxios';
import { services } from '../config/routes';

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
            data: order
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
        const nonNullableDataItems = data.items.filter(item => {
            return Boolean(item.customer && item.customer.id);
        });
        this.orders = observable.array(nonNullableDataItems);
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
