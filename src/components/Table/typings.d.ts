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
interface OrderInfo {
    id: string;
    name: string;
    phone: string;
    fitting: string;
    status: OrderStatusInfo;
    date: string; // TODO: подумать как скрестить Date и string
}

type OrderStatus = 'TEMPORARY' | 'NEW' | 'IN_PROGRESS' | 'DONE';

interface PanelRowProps {
    orderInfo: OrderInfo | null;
    orderStatuses: OrderStatus[];
    acceptCallback?: (...arg: any[]) => any;
    ordersStore: OrderList.IOrderStore;
    lang: Lang;
}

interface FilterParams {
    text: string;
    allStatusesText?: string;
    type?: filterTypes;
    selectValues?: ListItem[];
    onClickFilterItem?(params: FilterParams, setFilterValue?: SetFilterValueFunction): void;
    pickerKey?: string;
    onChange?: (value: any) => void;
    textIsActive?: boolean;
    updatePickerData?(params: FilterParams, setFilterValue?: SetFilterValueFunction): void;
}

interface ListItem {
    value: string;
    text: string;
}

interface ListFilterData {
    options?: ListItem[];
    setFilterValue: SetFilterValueFunction;
    title?: string;
    pickerKey?: string;
}

interface DatePickerFilterFields {
    dateFrom: string;
    dateTo: string;
}

interface ActiveFilterValues {
    status?: string;
}

type SetFilterValueFunction = (value: string) => void

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

