import { app } from './app';
import { routingStore as routing } from './routingStore';
import user from './user';
import * as garments from './garments';
import { order } from './order';
import { ordersStore } from './orders';
import { filterStore } from './filterStore';
import customersStore from './customers';
import { pdfStore } from './pdfStore';

export default {
  app,
  user,
  garments,
  routing,
  order,
  filterStore,
  ordersStore,
  customersStore,
  pdfStore,
};
