import * as React from 'react';
import { Table } from '../../components/Table';
import { observer, inject } from 'mobx-react';
import { prepareTableData } from './utils';
import { parseQuery } from '../../utils/common';

@inject(({
    ordersStore,
    routing,
    app
}) => {
    return ({
        ordersStore,
        appStore: app,
        baseOrderId: parseQuery(routing.location.search).active_order_id
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
                baseOrderId={this.props.baseOrderId}
            />
        </div>
        );
    }
}

export {
    ListOrders
};
