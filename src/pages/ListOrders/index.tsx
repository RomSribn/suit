import * as React from 'react';
// import { Table } from '../../components/Table';
import { observer, inject } from 'mobx-react';

@inject(({
    ordersStore
}) => {
    return ({
        ordersStore
    });
})
@observer
class ListOrders extends React.PureComponent<any> { //tslint:disable-line
    componentDidMount() {
        this.props.ordersStore.fetch();
    }
    render() {
        return (<span>fusk</span>);
    }
}

export {
    ListOrders
};
