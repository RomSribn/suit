// import { App } from '../stores/app';
import { OrderStore } from '../stores/order';
import { Subgroups } from '../stores/garments';

export interface CommonStores {
    app: IAppStore;
    order: OrderStore;
    ordersStore: OrderList.IOrderStore;
    user: IUserStore;
    routing: {
        location: {
            search: string;
        }
    };
    garments: {
        Subgroups: typeof Subgroups
    };
    customersStore: ICustomerStore;
}
