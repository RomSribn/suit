import * as React from 'react';
import { inject, observer } from 'mobx-react';
// import { Redirect } from 'react-router';
import { MainSection } from './SectionMain';
// import { routes } from './routes';
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
         } = this.props;
        const detailsDeep = !(/\/order\/details\/.*\/.*/i.test(location.pathname));
        const afterGarmentChoice = (/\/order\/.*\/.*/i.test(location.pathname));
        const isIndexPage = false;

        return (
            <MainSection
                afterGarmentChoice={afterGarmentChoice}
                isIndexPage={isIndexPage}
                detailsDeep={detailsDeep}
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
        if (orderStore.isEmptyOrder()) {
            const query = parseQuery(this.props.routingStore.location.search);
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
        }
        return <Order {...this.props} />;
    }
}

export {
    Container as Order,
};