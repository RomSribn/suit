import * as React from 'react';
import RTable from 'react-table';
import * as classNames from 'classnames';

import  { PanelRow } from './PanelRow';
import { Filter } from './Filter';
import { ListPickerDropdown } from './ListPickerDropdown';
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

interface TState {
    activeOrderId: string | null;
    listFilterData?: ListFilterData;
    showListPickerFilter: boolean;
    activeFilterValues: ActiveFilterValues;
    selectedOrder: OrderInfo | null;
}

type RowInfo = {
    /** Информация о заказе, сообранная по столбцам */
    row: OrderInfo;
} | undefined;

const cell = (row: any) => <div className="orders__data">{row.value}</div>; // tslint:disable-line
const filterMethod = (filter: any, row: any) => { // tslint:disable-line
    return row[filter.id].toLowerCase().includes(filter.value.toLowerCase()); // tslint:disable-line
};

class Table extends React.PureComponent<TProps, TState> {
    private panelRow: React.RefObject<PanelRow>;
    constructor(props: TProps) {
        super(props);
        this.panelRow = React.createRef();
        this.state = {
            activeOrderId: null,
            showListPickerFilter: false,
            activeFilterValues: {},
            selectedOrder: null
        };
    }

    setActiveOrderId = (id: string | null) => {
        this.setState({ activeOrderId: id });
    }

    filterMethod = (
        filter: { id: string, value: string, [key: string]: string },
        row: { date: string | { [key: string]: string & { name: string } } }
    ) => {
        return filter.value === 'all' || row[filter.id].name.toLocaleLowerCase().includes(filter.value.toLowerCase());
    }

    onClickFilterItem = async (
        filterItemParams: FilterParams, setFilterValue?: (value: string) => void
    ) => {
        switch (filterItemParams.type) {
            case 'select':
                return this.updatePickerData(
                    filterItemParams,
                    setFilterValue,
                    () => this.triggerShowListPickerFilter()
                ); 
            default:
                return null;
        }
    }

    updatePickerData = (
        filterItemParams?: FilterParams,
        setFilterValue?: (value: string) => void,
        callback: () => void = () => undefined
    ) => {
        const {
            listFilterData
        } = this.state;
        this.setState({
            listFilterData: filterItemParams
                ? {
                    options: filterItemParams.selectValues || [],
                    pickerKey: filterItemParams.pickerKey,
                    setFilterValue: setFilterValue
                        ? (value: any) => { // tslint:disable-line
                            setFilterValue(value);
                            if (filterItemParams.type !== 'date') {
                                setTimeout(() => {
                                    this.triggerShowListPickerFilter();
                                }, 50);
                            }
                        }
                        : (listFilterData! && listFilterData!.setFilterValue)
                }
                : undefined,
        }, () => callback());
    }

    triggerShowListPickerFilter = () => {
        const {
            showListPickerFilter
        } = this.state;
        this.setState({ showListPickerFilter: !showListPickerFilter});
    }

    setShowListPickerFilter = () => {
        this.setState({ showListPickerFilter: true});
    }

    setHideListPickerFilter = () => {
        this.setState({ showListPickerFilter: false});
    }

    setListFilterData = (data: ListFilterData) => {
        this.setState({
            listFilterData: data,
        });
    }

    onClickOuterListPickerFilter = () => {
        this.setHideListPickerFilter();
    }

    onFilteredChange = (filtered: {id: string, value: string}[]) => {
        this.setState({
            activeFilterValues: filtered.reduce(
                (acc: FilterMethodFilter, cur: { id: string, value: string, [key: string]: string }) => {
                acc[cur.id] = cur.value;
                return acc;
            }, {})
        });
    }

    setActiveOrderInfo = (orderInfo: OrderInfo) => {
        this.setState({ selectedOrder: orderInfo });
    }

    resetActiveInfo = () => {
        this.setState({ selectedOrder: null, activeOrderId: null });
    }
    render() {
        const {
            selectedOrder,
            showListPickerFilter,
            listFilterData,
            activeFilterValues,
        } = this.state;
        const {
            lang,
            orders
        } = this.props;
        const {
            columns,
            statuses,
            statuses: { ALL_STATUSES: allStatusesText},
        } = loc[lang];
        return (
        <React.Fragment key="Orders table fragment">
            <PanelRow
                ref={this.panelRow}
                orderInfo={selectedOrder}
                orderStatuses={orderStatuses}
                ordersStore={this.props.ordersStore}
                lang={lang}
                acceptCallback={this.resetActiveInfo}
            />
            <RTable
                className={classNames('orders', {orders_blured: showListPickerFilter})}
                showPagination={false}
                sortable={false}
                loadingText=""
                minRows={0}
                onFilteredChange={this.onFilteredChange}
                getTrProps={({}, rowInfo: RowInfo) => {
                    return {
                        onClick: () => {
                            this.panelRow.current && this.panelRow.current.triggerControls(true); // tslint:disable-line
                            if (rowInfo) {
                                this.setActiveOrderId(rowInfo.row.id);
                                this.setActiveOrderInfo(rowInfo.row);
                            }
                        },
                        className: classNames({ _active: this.state.activeOrderId === (rowInfo && rowInfo.row.id)})
                    };
                }}
                columns={[
                    {
                        accessor: 'order',
                        id: 'id',
                        Filter: () =>  <Filter text={columns.order} />,
                        filterable: true,
                        filterMethod,
                        Cell: cell
                    },
                    {
                        accessor: 'name',
                        Filter: () =>  <Filter text={columns.name} />,
                        filterable: true,
                        filterMethod,
                        Cell: cell
                    },
                    {
                        accessor: 'phone',
                        Filter: () =>  <Filter text={columns.phone} />,
                        filterable: true,
                        filterMethod,
                        Cell: cell
                    },
                    {
                        Filter: () =>  <Filter text={columns.fitting} />,
                        filterable: true,
                        accessor: 'fitting',
                        Cell: cell
                    },
                    {
                        Filter: (props) => <Filter
                            textIsActive={showListPickerFilter
                                && listFilterData
                                && listFilterData.pickerKey === 'statusSelect'}
                            text={(activeFilterValues.status && loc[lang].statuses[activeFilterValues.status])
                                || columns.status}
                            type="select"
                            pickerKey="statusSelect"
                            selectValues={[
                                { value: 'all', text: allStatusesText },
                                ...orderStatuses.map(status => ({ value: status, text: statuses[status] }))
                            ]}
                            onClickFilterItem={this.onClickFilterItem}
                            updatePickerData={this.updatePickerData}
                            onChange={props.onChange}
                        />,
                        filterMethod: this.filterMethod,
                        filterable: true,
                        accessor: 'status',
                        Cell: (row: {value: {name: OrderStatus}}) =>
                            <div className="orders__data">{statuses[row.value.name]}</div>
                    },
                    {
                        Filter: (props) => <Filter
                            textIsActive={false}
                            text={columns.date}
                            type="date"
                            pickerKey="datePicker"
                            onClickFilterItem={this.onClickFilterItem}
                            updatePickerData={this.updatePickerData}
                            onChange={props.onChange}
                        />,
                        filterable: true,
                        accessor: 'date',
                        Cell: cell
                    }
                ]}
                data={orders}
            />
                <ListPickerDropdown
                    lang={lang}
                    data={listFilterData}
                    show={showListPickerFilter}
                    onClickOuterPopup={this.onClickOuterListPickerFilter}
                />
        </React.Fragment>
        );
    }
}

export {
    Table,
    TableData,
    Columns,
};
