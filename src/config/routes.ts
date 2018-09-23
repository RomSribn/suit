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
  
};
type MakeNavigationRoutes = () => NavigationRoutes;
const makeNavigationRoutes: MakeNavigationRoutes = () => ({
  index: '/',
  order: '/order/details/shirt',
  panel: '/panel',
  clientele: '/clients',
  calendar: '/calendar',
  tasks: '/tasks',
  analytics: '/analytics',
  settings: '/settings',
  ordersList: '/order/list'
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

const routes = {
  details: `/order/details`,
  order: '/order',
  login: '/login',
  index: '/',
};

export {
  navigationRoutes,
  routesTranslations,
  routes,
};
