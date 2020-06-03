import * as React from 'react';
import RTable, { CellInfo, FilterRender } from 'react-table';
import * as classNames from 'classnames';
import * as moment from 'moment';

import  { PanelRow } from './PanelRow';
import { Filter } from './Filter';
import { DatePickerDropdown } from './DatePickerDropdown';
import { ListPickerDropdown } from './ListPickerDropdown';

import { loc } from './loc';
import './styles.styl';
import { getPhoneOrEmail } from './getPhoneOrEmail/salons';

export type TableDataItemStringFields = 'id' | 'name' | 'fitting' | 'phone' | 'date' | 'email';
type Columns = TableDataItemStringFields | 'status' | 'isConfirmed';
const orderStatuses: OrderStatus[] = ['TEMPORARY', 'NEW', 'IN_PROGRESS', 'DONE'];

type TableDataItem = {
    [key in TableDataItemStringFields]: string;
} & { status: OrderStatusInfo, isConfirmed: boolean };
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
    baseOrderId?: string;
    userToken?: string;
    role?: Role;
}

interface TState {
    activeOrderId: string | null;
    filterData?: FilterData;
    showListPickerFilter: boolean;
    activeFilterValues: ActiveFilterValues;
    showDatePickerFilter: boolean;
    selectedOrder: TableOrderInfo | null;
}

type RowInfo = {
    /** Информация о заказе, сообранная по столбцам */
    row: TableOrderInfo;
    original: TableOrderInfo;
} | undefined;

class Table extends React.Component<TProps, TState> {
    private panelRow: React.RefObject<PanelRow>;
    constructor(props: TProps) {
        super(props);
        this.panelRow = React.createRef();
        this.state = {
            activeOrderId: this.props.baseOrderId || null,
            selectedOrder: null,
            showDatePickerFilter: false,
            showListPickerFilter: false,
            activeFilterValues: {}
        };
    }
    setActiveOrderId = (id: string | null) => {
        this.setState({ activeOrderId: id });
    }

    filterMethod = (
        filter: { id: string, value: string, [key: string]: string },
        row: { date: string | { [key: string]: string & { name: string } } }
    ) => {
        const cellValue = filter.id === 'status' ? row[filter.id].name : row[filter.id];
        return filter.value === 'all' || cellValue.toLocaleLowerCase().includes(filter.value.toLowerCase());
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

    setFilterData = (data: FilterData) => {
        this.setState({
            filterData: data,
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
            // @ts-ignore
            }, {})
        });
    }

    setActiveOrderInfo = (orderInfo: TableOrderInfo) => {
        this.setState({ selectedOrder: orderInfo });
    }

    resetActiveInfo = () => {
        this.setState({ selectedOrder: null, activeOrderId: null });
    }
    onClickFilterItem = (
        filterItemParams: FilterParams, inputRef: React.RefObject<HTMLDivElement>,
        setFilterValue?: (value: DatePickerFilterFields) => void
    ) => {
        switch (filterItemParams.type) {
            case 'date': {
                return this.updatePickerData(this.preparePickerData(filterItemParams, inputRef, setFilterValue, () => {
                    this.setHideDatePickerFilter();
                }), () => {
                    this.setShowDatePickerFilter();
                });
            }
            case 'select':
                return this.updatePickerData(
                    this.preparePickerData(filterItemParams, inputRef, setFilterValue, (value) => {
                        this.setHideListPickerFilter();
                        if (filterItemParams.name) {
                           this.setState({ activeFilterValues: {
                               ...this.state.activeFilterValues,
                               [filterItemParams.name]: value,
                           }});
                        }
                    }), () => {
                    this.setShowListPickerFilter();
                });
            default:
                return null;
        }
    }
    preparePickerData = (
        filterItemParams: FilterParams,
        inputRef: React.RefObject<HTMLDivElement>,
        setFilterValue?: (value: DatePickerFilterFields) => void,
        updateCallback?: (value: string) => void
    ) => {
        const {
            filterData
        } = this.state;
        return filterItemParams
            ? {
                options: filterItemParams.selectValues || [],
                setFilterValue: setFilterValue
                    ? (value: any) => { // tslint:disable-line
                        setFilterValue(value);
                        setTimeout(() => {
                            updateCallback && updateCallback(value); // tslint:disable-line
                        }, 50);
                    }
                    : (filterData! && filterData!.setFilterValue),
                inputRef
            }
            : undefined;
    }
    updatePickerData = (
        newfilterData?: FilterData,
        callback?: () => void,
    ) => {
        this.setState({ filterData: newfilterData }, () => callback && callback()); //tslint:disable-line
    }
    onClickOuterDatePickerFilter = () => {
        this.setHideDatePickerFilter();
    }
    triggerShowDatePickerFilter = () => {
        const {
            showDatePickerFilter
        } = this.state;
        this.setState({ showDatePickerFilter: !showDatePickerFilter });
    }
    setShowDatePickerFilter = () => {
        this.setState({ showDatePickerFilter: true });
    }
    setHideDatePickerFilter = () => {
        this.setState({ showDatePickerFilter: false });
    }
    setListFilterData = (data: FilterData) => {
        this.setState({
            filterData: data
        });
    }
    datePickerFilterMethod = (
        filter: { id: string, value: string, [key: string]: string }, row: { date: string, [key: string]: string }
    ) => {
        if (filter.id === 'date' && filter.value) {
            const dateFromStr = filter.value.split('--')[0];
            const dateToStr = filter.value.split('--')[1];
            if (dateFromStr && dateToStr) {
                const dateFromMoment = moment(dateFromStr, 'DD.MM.YYYY');
                const dateToMoment = moment(dateToStr, 'DD.MM.YYYY');
                const curentDate = moment(row.date, 'DD/MM/YYYY');
                if (dateFromMoment.isBefore(curentDate) && dateToMoment.isAfter(curentDate)) {
                    return true;
                }
                return false;
            }
            return true;
        }
        return true;
    }

    renderStatusFilter: FilterRender = (props) => {
        const {
            activeFilterValues,
            showListPickerFilter
        } = this.state;
        const { lang } = this.props;
        const {
            columns,
            statuses,
            statuses: { ALL_STATUSES: allStatusesText },
        } = loc[lang];
        return (
            <Filter
                text={(activeFilterValues.status && loc[lang].statuses[activeFilterValues.status])
                || columns.status}
                type="select"
                name={props.column.id}
                isActive={showListPickerFilter}
                selectValues={[
                    { value: 'all', text: allStatusesText },
                    ...orderStatuses.map(status => ({ value: status, text: statuses[status] }))
                ]}
                onClickFilterItem={this.onClickFilterItem}
                updatePickerData={
                    (
                        filterItemParams: FilterParams,
                        inputRef: React.RefObject<HTMLDivElement>,
                        setFilterValue?: (value: DatePickerFilterFields) => void
                    ) => this.updatePickerData(
                        this.preparePickerData(filterItemParams, inputRef, setFilterValue)
                    )
                }
                onChange={props.onChange}
            />
        );
    }

    renderDateFilter: FilterRender = (props) => {
        const { showDatePickerFilter } = this.state;
        const { lang } = this.props;
        const { columns } = loc[lang];
        return (
            <Filter
                text={columns.date}
                type="disabled"
                isActive={showDatePickerFilter}
                onClickFilterItem={this.onClickFilterItem}
                updatePickerData={
                    (
                        filterItemParams: FilterParams,
                        inputRef: React.RefObject<HTMLDivElement>,
                        setFilterValue?: (value: DatePickerFilterFields) => void
                    ) => this.updatePickerData(
                        this.preparePickerData(filterItemParams, inputRef, setFilterValue)
                    )
                }
                onChange={props.onChange}
            />
        );
    }

    renderCell = (props: CellInfo) => {
        const { lang } = this.props;
        const { columns } = loc[lang];
        return (
            <>
                <div className="orders__title-mob">{columns[props.column.id || '']}</div>
                <div className="orders__data">{props.value}</div>
            </>
        );
    }

    render() {
        const {
            activeOrderId,
            selectedOrder,
            showDatePickerFilter,
            filterData,
            showListPickerFilter
        } = this.state;
        const {
            lang,
            orders,
            role
        } = this.props;
        const {
            columns,
            statuses,
        } = loc[lang];

        return (
        <React.Fragment key="Orders table fragment">
            <PanelRow
                userToken={this.props.userToken}
                ref={this.panelRow}
                orderInfo={selectedOrder}
                orderStatuses={orderStatuses}
                ordersStore={this.props.ordersStore}
                lang={lang}
                activeOrderId={this.state.activeOrderId}
                acceptCallback={this.resetActiveInfo}
                role={role}
            />
            <RTable
                className={classNames('orders', 'flex-content', {orders_blured: showDatePickerFilter})}
                showPagination={false}
                sortable={false}
                loadingText=""
                minRows={0}
                getTrProps={({}, rowInfo: RowInfo) => {
                    return {
                        onClick: () => {
                            this.panelRow && this.panelRow.current && this.panelRow.current.triggerControls(true); // tslint:disable-line
                            if (rowInfo) {
                                this.setActiveOrderId(rowInfo.row.id);
                                this.setActiveOrderInfo(rowInfo.original);
                            }
                        },
                        className: classNames({ _active: activeOrderId === (rowInfo && rowInfo.row.id)})
                    };
                }}
                columns={[
                    {
                        accessor: 'id',
                        Filter: ({ filter, onChange }) => <Filter
                            text={columns.id}
                            inputValue={filter && filter.value || ''}
                            onChange={onChange}
                        />,
                        filterable: true,
                        filterMethod: this.filterMethod,
                        Cell: this.renderCell,
                    },
                    {
                        accessor: 'name',
                        Filter: ({ filter, onChange }) => <Filter
                            text={columns.name}
                            inputValue={filter && filter.value || ''}
                            onChange={onChange}
                        />,
                        filterable: true,
                        filterMethod: this.filterMethod,
                        Cell: this.renderCell,
                        show: role === 'STYLIST',
                    },
                    getPhoneOrEmail({
                        columnsText: columns,
                        cell: this.renderCell,
                        filterMethod: this.filterMethod,
                        show: role === 'STYLIST',
                    }),
                    {
                        Filter: () => <Filter text={columns.fitting} type="disabled"/>,
                        filterable: true,
                        accessor: 'fitting',
                        Cell: this.renderCell,
                    },
                    {
                        Filter: this.renderStatusFilter,
                        filterMethod: this.filterMethod,
                        filterable: true,
                        accessor: 'status',
                        Cell: (row: {value: {name: string}}) =>
                            <>
                                <div className="orders__title-mob">{columns.status}</div>
                                <div className="orders__data">{statuses[row.value.name]}</div>
                            </>,
                    },
                    {
                        accessor: 'isConfirmed',
                        Filter: () => <Filter text={columns.isConfirmed} type="disabled" />,
                        filterable: true,
                        filterMethod: this.filterMethod,
                        Cell: (row: {value: boolean}) =>
                            <>
                                <div className="orders__title-mob">{columns.isConfirmed}</div>
                                <div className="orders__data">
                                    {row.value ? loc[lang].isConfirmed : loc[lang].notConfirmed}
                                </div>
                            </>,
                        show: role === 'STYLIST',
                    },
                    {
                        Filter: this.renderDateFilter,
                        filterMethod: this.datePickerFilterMethod,
                        filterable: true,
                        accessor: 'date',
                        Cell: this.renderCell,
                    }
                ]}
                data={orders}
            />
            <DatePickerDropdown
                lang={lang}
                data={filterData}
                show={showDatePickerFilter}
                onClickOuterDatePickerFilter={this.onClickOuterDatePickerFilter}
            />
            <ListPickerDropdown
                lang={lang}
                data={filterData}
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
    Columns
};
