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
  login: `${API_ROOT}/api/auth/login`,
  logout: `${API_ROOT}/api/auth/logout`,
  
};
type MakeNavigationRoutes = () => NavigationRoutes;
const makeNavigationRoutes: MakeNavigationRoutes = () => ({
  index: '/',
  order: '/order/details',
  panel: '/panel',
  clientele: '/clients',
  orders: '/order_list',
  calendar: '/calendar',
  tasks: '/tasks',
  analytics: '/analytics',
  settings: '/settings',
});
const navigationRoutes = makeNavigationRoutes();

const routesTranslations = {
  en: {
    order: 'order',
    panel: 'panel',
    clientele: 'clients',
    orders: 'order list',
    calendar: 'calendar',
    tasks: 'tasks',
    analytics: 'analytics',
    settings: 'settings',
  },
  ru: {
    order: 'заказать',
    panel: 'панель',
    clientele: 'клиенты',
    orders: 'заказы',
    calendar: 'календарь',
    tasks: 'задачи',
    analytics: 'аналтика',
    settings: 'настройки',
  },
};

const routes = {
  details: `/details`,
  order: '/order',
  login: '/login',
  index: '/',
};

export {
  navigationRoutes,
  routesTranslations,
  routes,
};
