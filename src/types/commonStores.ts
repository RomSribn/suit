import { App } from '../stores/app';
import { OrderStore } from '../stores/order';
import { Subgroups } from '../stores/garments';

export interface CommonStores {
    app: App;
    order: OrderStore;
    garments: {
        Subgroups: typeof Subgroups
    };
}
