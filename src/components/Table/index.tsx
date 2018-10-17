import * as React from 'react';
import RTable from 'react-table';
import * as classNames from 'classnames';
import  { PanelRow } from './PanelRow';
import { filterFabric } from './filterFabric';
import { loc } from './loc';
import './styles.styl';

type TableDataItemStringFieds = 'order' | 'name' | 'fitting' | 'phone' | 'date';
type Columns = TableDataItemStringFieds | 'status';
const orderStatuses: OrderStatus[] = ['TEMPORARY', 'NEW', 'IN_PROGRESS', 'DONE'];

type TableDataItem = {
    [key in TableDataItemStringFieds]: string;
} & { status: OrderStatusInfo };
type TableData = TableDataItem[];
interface TProps {
    orders: TableData;
    // TODO: Ну, а че поделать, если у нас ахуенныйы бек, который нихуя не умеет в PATCH
    // TODO: удалить к хуям после появления PUT
    /** Эта поебота нужна для того, чтобы потом находить весь заказ среди всех имеющихся
     * и отправлять его PUT'ом
     */
    ordersStore: OrderList.IOrderStore;
    lang: Lang;
}

type RowInfo = {
    /** Информация о заказе, сообранная по столбцам */
    row: TableOrderInfo;
} | undefined;

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
    return row[filter.id].toLowerCase().includes(filter.value.toLowerCase()); // tslint:disable-line
};

class Table extends React.PureComponent<
    TProps, { activeOrderId: string | null, selectedOrder: TableOrderInfo | null }
    > {
    private panelRow: PanelRow | null;
    constructor(props: TProps) {
        super(props);
        this.state = {
            activeOrderId: null,
            selectedOrder: null
        };
    }
    setActiveOrderId = (id: string | null) => {
        this.setState({ activeOrderId: id });
    }

    setActiveOrderInfo = (orderInfo: TableOrderInfo) => {
        this.setState({ selectedOrder: orderInfo });
    }

    resetActiveInfo = () => {
        this.setState({ selectedOrder: null, activeOrderId: null });
    }
    render() {
        const {
            activeOrderId,
            selectedOrder
        } = this.state;
        const lang = this.props.lang;
        const {
            columns,
            statuses,
            statuses: { ALL_STATUSES: allStatusesText}
        } = loc[lang];

        return (
        <React.Fragment key="Orders table fragment">
            <PanelRow
                ref={(ref) => this.panelRow = ref}
                orderInfo={selectedOrder}
                orderStatuses={orderStatuses}
                ordersStore={this.props.ordersStore}
                lang={lang}
                acceptCallback={this.resetActiveInfo}
            />
            <RTable
                className="orders"
                showPagination={false}
                sortable={false}
                loadingText=""
                minRows={0}
                getTrProps={({}, rowInfo: RowInfo) => {
                    return {
                        onClick: () => {
                            this.panelRow && this.panelRow.triggerControls(true); // tslint:disable-line
                            if (rowInfo) {
                                this.setActiveOrderId(rowInfo.row.id);
                                this.setActiveOrderInfo(rowInfo.row);
                            }
                        },
                        className: classNames({ _active: activeOrderId === (rowInfo && rowInfo.row.id)})
                    };
                }}
                columns={[
                    {
                        accessor: 'order',
                        id: 'id',
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
                            selectValeus: orderStatuses
                        }),
                        filterMethod: (filter: any, row: any) => { // tslint:disable-line
                            return row[filter.id].name.toLowerCase()
                                    .includes(filter.value.toLowerCase()); // tslint:disable-line
                        },
                        filterable: true,
                        accessor: 'status',
                        Cell: (row: {value: {name: string}}) =>
                            <div className="orders__data">{statuses[row.value.name]}</div>
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
    Columns
};
