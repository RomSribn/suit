export const trim = (s: string, c: string): string => {
  if (c === ']') { c = '\\]'; }
  if (c === '\\') { c = '\\\\'; }
  return s.replace(new RegExp(
    '^[' + c + ']+|[' + c + ']+$', 'g'
  ), '');
};

const _API_ROOT = trim(process.env.API_ROOT || '', '/');
export const API_ROOT =
  _API_ROOT.indexOf('https://') === 0
    ? _API_ROOT
    : _API_ROOT.indexOf('http://') === 0
      ? _API_ROOT
      : `http://${_API_ROOT}`;

export const services = {
  garments: 'api/garments',
  shirtFilters: `${API_ROOT}/api/garments/shirt/filters/fabric`,
  garmentsDefaults: `${API_ROOT}/api/garments/defaults`,
  orders: `${API_ROOT}/api/orders`,
  orderDeliveryInfo: `${API_ROOT}/api/orders/orderDeliveryInfo`,
  login: `${API_ROOT}/api/auth/login`,
  logout: `${API_ROOT}/api/auth/logout`,
  customers: `${API_ROOT}/api/customers`,
};

const routes = {
  details: `/order/details`,
  order: '/order/details',
  orderList: '/order/list',
  login: '/login',
  index: '/',
};

type MakeNavigationRoutes = () => NavigationRoutes;
const makeNavigationRoutes: MakeNavigationRoutes = () => ({
  index: '/',
  order: routes.order,
  panel: '/panel',
  clientele: '/clients',
  calendar: '/calendar',
  tasks: '/tasks',
  analytics: '/analytics',
  settings: '/settings',
  ordersList: routes.orderList
});
const navigationRoutes = makeNavigationRoutes();

const routesTranslations = {
  en: {
    order: 'order',
    panel: 'panel',
    clientele: 'clients',
    ordersList: 'order list',
    calendar: 'calendar',
    tasks: 'tasks',
    analytics: 'analytics',
    settings: 'settings',
  },
  ru: {
    order: 'заказать',
    panel: 'панель',
    clientele: 'клиенты',
    ordersList: 'заказы',
    calendar: 'календарь',
    tasks: 'задачи',
    analytics: 'аналтика',
    settings: 'настройки',
  },
};

type RootKey = 'index' | 'order' | 'panel' | 'clientele' | 'calendar'
  | 'tasks' | 'analytics' | 'settings' | 'ordersList';

const getCombinedPathAndTitle = (routeKey: RootKey) =>
  ({
    path: navigationRoutes[routeKey], title: Object.keys(routesTranslations).reduce((acc, cur) => {
      acc[cur] = routesTranslations[cur][routeKey];
      return acc;
  }, {})});

export {
  navigationRoutes,
  routesTranslations,
  routes,
  getCombinedPathAndTitle
};
