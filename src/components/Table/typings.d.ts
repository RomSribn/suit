interface HeaderCellParams {
    isInput?: boolean;
    text?: string;
    isFilter?: boolean;
    accessor?: string;
}
interface OrderStatusInfo {
    statusId: number;
    name: string;
}
interface TableOrderInfo {
    id: string;
    name: string;
    phone: string;
    fitting: string;
    status: OrderStatusInfo;
    date: string; // TODO: подумать как скрестить Date и string
}

type OrderStatus = 'TEMPORARY' | 'NEW' | 'IN_PROGRESS' | 'DONE';

interface PanelRowProps {
    orderInfo: TableOrderInfo | null;
    orderStatuses: OrderStatus[];
    acceptCallback?: (...arg: any[]) => any;
    ordersStore: OrderList.IOrderStore;
    lang: Lang;
    activeOrderId?: string | null;
}

interface FilterParams {
    text: string;
    type?: filterTypes;
    selectValues?: ListItem[];
    onClickFilterItem?(params: FilterParams, inputRef: React.RefObject<HTMLDivElement>, setFilterValue?: SetFilterValueFunction): void;
    onChange?: (value: any) => void;
    updatePickerData?(params: FilterParams, inputRef: React.RefObject<HTMLDivElement>, setFilterValue?: SetFilterValueFunction): void;
    isActive?: boolean;
}

interface ListItem {
    value: string;
    text: string;
}

interface FilterData {
    options?: ListItem[];
    setFilterValue: SetFilterValueFunction;
    title?: string;
    inputRef: React.RefObject<HTMLDivElement>
}

interface DatePickerFilterFields {
    dateFrom: string;
    dateTo: string;
}

interface DatePickerFilterFields {
    dateFrom: string;
    dateTo: string;
}

interface ActiveFilterValues {
    status?: string;
}

type SetFilterValueFunction = (value: string | DatePickerFilterFields) => void

type filterTypes = 'input' | 'date' | 'select' | 'empty';

interface FilterMethodFilter {
    id: string,
    value: string,
    [key: string]: string
}

interface FilterMethodRow {
    date: string,
    [key: string]: string
}

