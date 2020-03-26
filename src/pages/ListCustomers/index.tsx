import * as React from 'react';
import { TableCustomers } from '../../components/TableCustomers';
import { observer, inject } from 'mobx-react';

@inject(({ customersStore, app}) => ({
    customersStore,
    appStore: app,
}))
@observer
class ListCustomers extends React.Component<ListCustomersProps> {
    constructor(props: ListCustomersProps) {
        super(props);
        this.props.customersStore!.fetch();
    }
    render() {
        const customers = this.props.customersStore!.customers;
        const lang = this.props.appStore!.lang;
        return (
            <div className="main__middle">
                <TableCustomers
                    customers={customers}
                    lang={lang}
                />
            </div>
        );
    }
}

export {
    ListCustomers
};
