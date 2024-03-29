import * as React from 'react';
import { Table } from '../../components/Table';
import { observer, inject } from 'mobx-react';
import { prepareTableData } from './utils';
import { parseQuery } from '../../utils/common';
import { CommonStores } from '../../types/commonStores';
import { testOrder1, testOrder2 } from './testOrder';

@inject<CommonStores, ListOrdersProps, {}, {}>(
  ({ ordersStore, routing, user, app }) => {
    const userToken = (user.profile && user.profile.token) || 'no-token';
    const role = (user.profile && user.profile.role) || null;
    return {
      ordersStore,
      appStore: app,
      baseOrderId: parseQuery(routing.location.search).active_order_id,
      userToken,
      role,
    };
  },
)
@observer
class ListOrders extends React.Component<ListOrdersProps> {
  constructor(props: ListOrdersProps) {
    super(props);
    const fetchByRole = {
      STYLIST: this.props.ordersStore!.fetch,
      CUSTOMER: this.props.ordersStore!.fetchCustomerOrders,
      ANON: this.props.ordersStore!.fetch,
    };
    const role = this.props.role || 'ANON';
    fetchByRole[role]();
  }
  render() {
    const ordersStore = this.props.ordersStore!;
    const orders = this.props.role
      ? this.props.ordersStore!.orders
      : [testOrder1, testOrder2];
    const lang = this.props.appStore!.lang;

    return (
      <div className="main__middle">
        <Table
          orders={prepareTableData(orders, lang)}
          lang={lang}
          ordersStore={ordersStore}
          userToken={this.props.userToken}
          baseOrderId={this.props.baseOrderId}
          role={this.props.role}
        />
      </div>
    );
  }
}

export { ListOrders };
