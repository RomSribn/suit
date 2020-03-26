import * as React from 'react';
import RTable, { FilterRender } from 'react-table';
import * as classNames from 'classnames';

import  { PanelRow } from './PanelRow';
import { Filter } from '../Table/Filter';

import { loc } from './loc';
import './styles.styl';

type TableDataItemStringFields = 'name' | 'phone' | 'email' | 'password' | 'lastOrderId';
type Columns = TableDataItemStringFields;

type TableDataItem = {
    id?: number;
    name: string;
    phone: string;
    email?: string;
    password?: string;
    lastOrderId?: string;
};

type TableData = TableDataItem[];

interface TProps {
    customers: TableData;
    baseCustomerId?: string;
    lang: Lang;
}

interface TState {
    activeCustomerId: string | null;
    selectedCustomer: TableCustomerInfo | null;
}

type RowInfo = {
    /** Информация о клиенте, собранная по столбцам */
    original: TableCustomerInfo;
} | undefined;

const cell = (row: {value: string, [key: string]: string}) => <div className="customers__data">{row.value}</div>; // tslint:disable-line

class TableCustomers extends React.Component<TProps, TState> {
    private panelRow: React.RefObject<PanelRow>;
    constructor(props: TProps) {
        super(props);
        this.panelRow = React.createRef();
        this.state = {
            activeCustomerId: this.props.baseCustomerId || null,
            selectedCustomer: null,
        };
    }
    setActiveCustomerId = (id: string | null) => {
        this.setState({ activeCustomerId: id });
    }

    filterMethod = (
        filter: { id: string, value: string, [key: string]: string },
        row: { date: string | { [key: string]: string & { name: string } } }
    ) => {
        return filter.value === 'all' || row[filter.id].toLocaleLowerCase().includes(filter.value.toLowerCase());
    }

    setActiveCustomerInfo = (customerInfo: TableCustomerInfo) => {
        this.setState({ selectedCustomer: customerInfo });
    }

    renderNameFilter: FilterRender = (props) => {
        const { lang } = this.props;
        const { columns } = loc[lang];
        return <Filter text={columns.name} {...props} />;
    }

    renderEmailFilter: FilterRender = (props) => {
        const { lang } = this.props;
        const { columns } = loc[lang];
        return <Filter text={columns.email} {...props} />;
    }

    renderPhoneFilter: FilterRender = (props) => {
        const { lang } = this.props;
        const { columns } = loc[lang];
        return <Filter text={columns.phone} {...props} />;
    }

    renderPasswordFilter: FilterRender = (props) => {
        const { lang } = this.props;
        const { columns } = loc[lang];
        return <Filter text={columns.password} {...props} />;
    }

    renderLastOrderIdFilter: FilterRender = (props) => {
        const { lang } = this.props;
        const { columns } = loc[lang];
        return <Filter text={columns.lastOrderId} {...props} />;
    }

    render() {
        const { activeCustomerId } = this.state;
        const {
            lang,
            customers,
        } = this.props;

        return (
        <React.Fragment key="Customers table fragment">
            <PanelRow
                ref={this.panelRow}
                lang={lang}
            />
            <RTable
                className={classNames('customers', 'flex-content' )}
                showPagination={false}
                sortable={false}
                loadingText=""
                minRows={0}
                getTrProps={({}, rowInfo: RowInfo) => {
                    return {
                        onClick: () => {
                            // this.PanelRow && this.PanelRow.current && this.PanelRow.current.triggerControls(true);
                            if (rowInfo) {
                                this.setActiveCustomerId(rowInfo.original.id);
                                this.setActiveCustomerInfo(rowInfo.original);
                            }
                        },
                        className: classNames({ _active: activeCustomerId === (rowInfo && rowInfo.original.id)})
                    };
                }}
                columns={[
                    {
                        accessor: 'name',
                        Filter: this.renderNameFilter,
                        filterable: true,
                        Cell: cell,
                    },
                    {
                        accessor: 'phone',
                        Filter: this.renderPhoneFilter,
                        filterable: true,
                        Cell: cell,
                    },
                    {
                        accessor: 'email',
                        Filter: this.renderEmailFilter,
                        filterable: true,
                        Cell: cell,
                    },
                    {
                        accessor: 'password',
                        Filter: this.renderPasswordFilter,
                        filterable: true,
                        Cell: () => <div className="customers__data">******</div>,
                    },
                    {
                        accessor: 'lastOrderId',
                        Filter: this.renderLastOrderIdFilter,
                        filterable: true,
                        Cell: () => <div className="customers__data">shirt</div>,
                    },
                ]}
                data={customers}
            />
        </React.Fragment>
        );
    }
}

export {
    TableCustomers,
    Columns,
};
