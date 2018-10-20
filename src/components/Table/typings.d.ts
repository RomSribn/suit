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
