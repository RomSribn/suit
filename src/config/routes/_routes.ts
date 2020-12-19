type MakeNavigationRoutes = () => NavigationRoutes;
const makeNavigationRoutes: MakeNavigationRoutes = () => ({
    index: '/',
    order: '/order',
    panel: '/panel',
    customersList: '/customer/list',
    ordersList: '/orders/list',
    calendar: '/calendar',
    store: '/store',
    analytics: '/analytics',
    settings: '/settings',
  });
const navigationRoutes = makeNavigationRoutes();

const services = {
    garments: 'api/garments',
  };

const routes = {
    details: `/details`,
    order: '/order',
    login: '/login',
    index: '/',
  };

export {
    navigationRoutes,
    services,
    routes
};