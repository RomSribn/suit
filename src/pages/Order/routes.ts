type MakeRoutes = (indexRoute?: string) => OrderRoutes;

const makeRoutes: MakeRoutes = (indexRoute = '/order') => ({
    index: `${indexRoute}`,
    details: `${indexRoute}/details`,
});

export {
    makeRoutes,
};
