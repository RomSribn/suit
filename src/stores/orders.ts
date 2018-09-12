import { observable, action } from 'mobx';
import { callApi } from '../utils/apiAxios';
import { services } from '../config/routes';

type List = OrderList.ServerData.List;
type Fetch<T, Data> = (params: T) => Promise<void | Axios.Response<Data>>;

class OrdersStore implements OrderList.IOrderStore {
    @observable isFetching = false;
    @observable error: Error | null = null;

    @observable orders = observable.array<OrderList.OrderItem>();
    
    @action
    fetch: Fetch<string, List> = (token) => {
        this.error = null;

        return callApi({
            method: 'get',
            url: services.orders
        },
        () => { this.isFetching = true; },
        this._onSuccess,
        this._onError);
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
