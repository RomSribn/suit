export const API_ROOT = process.env.API_ROOT;

type MakeRoutes = () => Routes;
const makeRoutes: MakeRoutes = () => ({
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
const routes = makeRoutes();

export {
  routes,
};
