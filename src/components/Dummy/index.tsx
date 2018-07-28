import * as React from 'react';
import { observer, inject } from 'mobx-react';
import { Dummy as Component } from './component';

@inject(({order }) => ({
  order: order.order,
  orderStore: order,
}))
@observer
class Dummy extends React.Component<P> {
  render() {
    const {
      order,
      orderStore,
    } = this.props;
    console.log(orderStore!.previewElement); // tslint:disable-line no-console
    return (<Component {...this.props} order={order} orderStore={orderStore} />);
  }
}

export {
  Dummy,
};
