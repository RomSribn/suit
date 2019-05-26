import { App } from '../stores/app';
import { OrderStore } from '../stores/order';

export interface CommonStores {
    app: App;
    order: OrderStore;
}