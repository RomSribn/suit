import * as React from 'react';
import { inject, observer } from 'mobx-react';
import { MainSection } from './SectionMain';
import { makeRoutes } from './routes';
import { parseQuery } from '../../utils/common';
let wasRendered = false;

class Order extends React.PureComponent<any> { //tslint:disable-line
    constructor(props: any) { //tslint:disable-line
        super(props);
        wasRendered = false;
    }
    render() {
        if (!wasRendered) {
            wasRendered = true;
        }
        const {
            location,
            match,
         } = this.props;
        const routes = makeRoutes(match.url);
        const detailsDeep = !(/\/order\/.*\/.*/i.test(location.pathname));
        const afterGarmentChoice = (/\/order\/.*\/.*/i.test(location.pathname));
        const isIndexPage = false;

        return (
            <MainSection
                afterGarmentChoice={afterGarmentChoice}
                isIndexPage={isIndexPage}
                detailsDeep={detailsDeep}
                routes={routes}
            />
        );
    }
}

@inject(({ order, garments, routing }) => ({
    orderStore: order,
    garmentsStore: garments.garments,
    routingStore: routing
}))
@observer
class Container extends React.Component<any>{ //tslint:disable-line
    render() {
        const orderStore = this.props.orderStore as IOrderStore;
        const garmentsStore = this.props.garmentsStore;
        if (!Object.keys(garmentsStore.garmentsList).length) {
            garmentsStore.fetchGarmentsList();
            return null;
        }
        const query = parseQuery(this.props.routingStore.location.search);
        if (orderStore.isEmptyOrder()) {
            if (query.order_id) {
                orderStore.fetchInitialOrder(
                    Object.keys(garmentsStore.garmentsList),
                    (garments) => garmentsStore.setChosenGarments(garments)
                )
                .then(() => {
                    orderStore.fetchOrder(query.order_id);
                });
            } else {
                orderStore.fetchInitialOrder(
                    Object.keys(garmentsStore.garmentsList),
                    (garments) => garmentsStore.setChosenGarments(garments)
                );
            }
            return null;
        } else {
            if (query.order_id && query.order_id !== String((orderStore.orderInfo && orderStore.orderInfo.orderId))) {
                orderStore.fetchOrder(query.order_id);
            }
        }
        return <Order {...this.props} />;
    }
}

export {
    Container as Order,
};