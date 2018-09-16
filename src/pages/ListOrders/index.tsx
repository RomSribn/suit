import * as React from 'react';
import { Table } from '../../components/Table';
import { observer, inject } from 'mobx-react';
import { prepareTableData } from './utils';

@inject(({
    ordersStore,
    app
}) => {
    return ({
        ordersStore,
        appStore: app
    });
})
@observer
class ListOrders extends React.Component<ListOrdersProps> {
    componentDidMount() {
        this.props.ordersStore!.fetch();
    }
    render() {
        const ordersStore = this.props.ordersStore!;
        const lang = this.props.appStore!.lang;
        return (
        <Table
            orders={prepareTableData(ordersStore.orders, lang)}
            lang={lang}
        />);
    }
}

export {
    ListOrders
};
