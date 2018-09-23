type MakeRoutes = (indexRoute?: string) => OrderRoutes;

const makeRoutes: MakeRoutes = (indexRoute = '/order') => {
    return {
        index: `${indexRoute}/details/shirt`,
        details: `${indexRoute}/details/shirt`,
        garment: `${indexRoute}/details/:garment`,
        groupChoice: `${indexRoute}/details/:garment/:group`,
        subgroupChoice: `${indexRoute}/details/:garment/:group/:subgroup`
    };
};
const routes = makeRoutes();
export {
    makeRoutes,
    routes
};
