type MakeNavigationRoutes = () => NavigationRoutes;
const makeNavigationRoutes: MakeNavigationRoutes = () => ({
    index: '/',
    order: '/order',
    panel: '/panel',
    clientele: '/clients',
    orders: '/order_list',
    calendar: '/calendar',
    tasks: '/tasks',
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