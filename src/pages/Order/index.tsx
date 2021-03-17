import * as React from 'react';
import { inject, observer } from 'mobx-react';
import { listeners } from '../../utils';
import { MainSection } from './SectionMain';
import { makeRoutes } from './routes';
import { Paralax } from './OrderDecorationBlocks';
import { parseQuery } from '../../utils/common';
import { Route } from 'react-router-dom';

let wasRendered = false;

// tslint:disable-next-line
class Order extends React.PureComponent<any> {
  // tslint:disable-next-line
  constructor(props: any) {
    super(props);
    wasRendered = false;
  }
  render() {
    if (!wasRendered) {
      wasRendered = true;
    }
    const { location, match } = this.props;
    const routes = makeRoutes(match.url);
    const detailsDeep = !/\/order\/details\/.*\/.*/i.test(location.pathname);
    const afterGarmentChoice = /\/order\/.*\/.*/i.test(location.pathname);
    const isIndexPage = false;

    return (
      <>
        <MainSection
          afterGarmentChoice={afterGarmentChoice}
          isIndexPage={isIndexPage}
          detailsDeep={detailsDeep}
          routes={routes}
        />
        <Route exact={true} path={routes.index} component={Paralax} />
      </>
    );
  }
}

@inject(({ order, garments, routing, app }) => ({
  orderStore: order,
  garmentsStore: garments.garments,
  routingStore: routing,
  clearVisitedChoiceItems: app.clearVisitedChoiceItems,
}))
@observer
// tslint:disable-next-line
class Container extends React.Component<any> {
  componentDidMount() {
    listeners.resize.subscribe(() => this.setState({}));
  }
  render() {
    const orderStore = this.props.orderStore as IOrderStore;
    const garmentsStore = this.props.garmentsStore;
    if (!Object.keys(garmentsStore.garmentsList).length) {
      garmentsStore.fetchGarmentsList();
      return null;
    }
    const query = parseQuery(this.props.routingStore.location.search);
    const isOnBase = query.onbase === 'true';
    if (orderStore.isEmptyOrder()) {
      if (query.order_id) {
        orderStore
          .fetchInitialOrder(
            Object.keys(garmentsStore.garmentsList)
          )
          .then(() => {
            orderStore.fetchOrder(query.order_id).then(() => {
              if (isOnBase) {
                orderStore.clearOrderInfo();
                this.props.clearVisitedChoiceItems();
              }
            });
          });
      } else {
        orderStore.fetchInitialOrder(
          Object.keys(garmentsStore.garmentsList)
        );
      }
      return null;
    } else {
      if (
        (query.order_id && query.order_id) !==
        String(orderStore.orderInfo && orderStore.orderInfo.orderId)
      ) {
        orderStore.fetchOrder(query.order_id).then(() => {
          if (isOnBase) {
            orderStore.clearOrderInfo();
            this.props.clearVisitedChoiceItems();
          }
        });
      } else if (isOnBase) {
        orderStore.clearOrderInfo();
        this.props.clearVisitedChoiceItems();
      }
    }
    return <Order {...this.props} />;
  }
}

export { Container as Order };
