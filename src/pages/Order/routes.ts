type MakeRoutes = (indexRoute: string) => OrderRoutes;

const makeRoutes: MakeRoutes = (indexRoute) => ({
    index: `${indexRoute}`,
    details: `${indexRoute}/details`,
});

export {
    makeRoutes,
};
