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
            />
        </div>
        );
    }
}

export {
    ListOrders
};
