import * as React from 'react';
import { Table } from '../../components/Table';
import { observer, inject } from 'mobx-react';
import { prepareTableData } from './utils';
import { parseQuery } from '../../utils/common';
import { CommonStores } from '../../types/commonStores';

@inject<CommonStores, ListOrdersProps, {}, {}>(({
    ordersStore,
    routing,
    user,
    app
}) => {
    const userToken = user.profile && user.profile.token || 'no-token';
    return ({
        ordersStore,
        appStore: app,
        baseOrderId: parseQuery(routing.location.search).active_order_id,
        userToken,
    });
})
@observer
class ListOrders extends React.Component<ListOrdersProps> {
    constructor(props: ListOrdersProps) {
        super(props);
        this.props.ordersStore!.fetch();
    }
    render() {
        const ordersStore = this.props.ordersStore!;
        const lang = this.props.appStore!.lang;
        return (
        <div className="main__middle">
            <Table
                orders={prepareTableData(ordersStore.orders, lang)}
                lang={lang}
                ordersStore={ordersStore}
                userToken={this.props.userToken}
                baseOrderId={this.props.baseOrderId}
            />
        </div>
        );
    }
}

export {
    ListOrders
};
