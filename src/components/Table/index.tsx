import * as React from 'react';
import RTable from 'react-table';
import * as classNames from 'classnames';
import  { PanelRow } from './PanelRow';
import { filterFabric } from './filterFabric';
import { loc } from './loc';
import './styles.styl';

type Columns = 'order' | 'name' | 'fitting' | 'phone' | 'status' | 'date';
type OrderStatus = 'TEMPORARY' | 'NEW' | 'IN_PROGRESS' | 'DONE';
const orderStatuses: OrderStatus[] = ['TEMPORARY', 'NEW', 'IN_PROGRESS', 'DONE'];

type TableData = {
    [key in Columns]: string;
}[];

interface TProps {
    orders: TableData;
    lang: string;
}

const headerCell = (params: HeaderCellParams) => {
    const baseClass = 'orders__title';
    return (
        <div
            className={classNames(baseClass, { [baseClass + '--filter']: params.isFilter })}
        >
        {params.isInput ?
            <input className="orders__input" type="text" placeholder={params.text} /> :
            <div>
                <span className={`${baseClass}-text`}>{params.text}</span>
            </div>
        }
        </div>
    );
};

const cell = (row: any) => <div className="orders__data">{row.value}</div>; // tslint:disable-line
const filterMethod = (filter: any, row: any) => { // tslint:disable-line
    return row[filter.id].toLocaleLowerCase().includes(filter.value.toLowerCase()); // tslint:disable-line
};
    
class Table extends React.PureComponent<TProps, { activeOrderId: string | null }> {
    private panelRow: PanelRow | null;
    constructor(props: TProps) {
        super(props);
        this.state = {
            activeOrderId: null
        };
    }
    setActiveOrderId = (id: string) => {
        this.setState({ activeOrderId: id });
    }
    render() {
        const {
            activeOrderId
        } = this.state;
        const lang = this.props.lang;
        const columns = loc[lang].columns;
        const statuses = loc[lang].statuses;
        const allStatusesText = loc[lang].statuses.ALL_STATUSES;
        return (
        <React.Fragment key="Orders table fragment">
            <PanelRow ref={(ref) => this.panelRow = ref} orderId={activeOrderId} />
            <RTable
                className="orders"
                showPagination={false}
                sortable={false}   
                loadingText=""
                minRows={0}
                getTrProps={(_: any, rowInfo: any) => { // tslint:disable-line
                    return {
                        onClick: () => {
                            this.panelRow && this.panelRow.triggerControls(true); // tslint:disable-line
                            this.setActiveOrderId(rowInfo.row.order);
                        },
                        className: classNames({ _active: activeOrderId === rowInfo.row.order})
                    };
                }}
                columns={[
                    {
                        accessor: 'order',
                        Filter: filterFabric({ text: columns.order, allStatusesText}),
                        filterable: true,
                        filterMethod,
                        Cell: cell
                    },
                    {
                        accessor: 'name',
                        Filter: filterFabric({ text: columns.name, allStatusesText}),
                        filterable: true,
                        filterMethod,
                        Cell: cell
                    },
                    {
                        accessor: 'phone',
                        Filter: filterFabric({ text: columns.phone, allStatusesText}),
                        filterable: true,
                        filterMethod,
                        Cell: cell
                    },
                    {
                        Filter: () => headerCell({text: columns.fitting}),
                        filterable: true,
                        accessor: 'fitting',
                        Cell: cell
                    },
                    {
                        Filter: filterFabric({
                            allStatusesText,
                            text: columns.status,
                            type: 'select',
                            selectValeus: orderStatuses.map(status => statuses[status])
                        }),
                        filterMethod,
                        filterable: true,
                        accessor: 'status',
                        Cell: cell
                    },
                    {
                        Filter: () => headerCell({text: columns.date}),
                        filterable: true,
                        accessor: 'date',
                        Cell: cell
                    } 
                ]}
                data={this.props.orders}
            />
        </React.Fragment>
        );
    }
}

export {
    Table,
    TableData,
    Columns,
    OrderStatus
};
