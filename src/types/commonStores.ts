// import { App } from '../stores/app';
import { OrderStore } from '../stores/order';
import { Subgroups } from '../stores/garments';
import GarmentsStore from '../stores/garments/garments';

export interface CommonStores {
  app: IAppStore;
  filterStore?: IAppStore;
  order: OrderStore;
  ordersStore: OrderList.IOrderStore;
  user: IUserStore;
  routing: {
    location: {
      search: string;
    };
  };
  garments: {
    Subgroups: typeof Subgroups;
    garments?: typeof GarmentsStore;
  };
  customersStore: ICustomerStore;
  pdfStore: IPdfStore;
}
