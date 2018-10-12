interface IOrderStore {
    orderInfo: OrderInfo | null;
    defaultValues: Order | null;
    hiddenElements: string[];    
    order: Order;
    isFetching: boolean;
    activeSubGroup: string;
    exceptions: OrderItemException | null;
    mutuallyExclusivePopup: MutuallyExclusive | null,
    isEmptyOrder: () => boolean;
    clearElement: (garment: string, element: string) => void;
    clearException: (garment: string, subGroup: string) => void;
    setMutuallyExclusivePopup: (callbackFunction: any) => void;
    activeElement: GalleryStoreItem | null;
    previewElement: ActivePreviewElement | null;
    error: object | null;
    setGarmentValue(garment: string, value: any): void;
    setOrder (_o: Order, exception: OrderItemException): void;
    saveOrder(customerInfo?: User): Promise<any>;
    updateOrderInfo(): Promise<any>;
    toggleHiddenElement(element: string): void;
    setShirtInitials(initials: string): void;
    getShirtInitials(): string;
    // fetchOrder(orderId: string): void;
    fetchInitialOrder(garments: string[], callback?: (...args: any[]) => any): void;
}

interface Order {
    [key: string]: OrderItem;
}

interface OrderInfo {
    orderId: number;
    deliveryDays: number;
    price: Translations<string>;
}

interface OrderItemInfo {
    our_code: string;
    is_subclear: boolean;
    title: Translations<string>;
}

interface OrderItemElement {
    our_code: string;
}

type OrderItemException = {
    [group: string]: {
        [subGroup: string]: ExceptionItem
    }
}

type ExceptionItem = {
    exceptions: string[],
    titleSubGroup: Translations<string> | null,
    titleElement: Translations<string> | null,
    is_item_clear: boolean
}

interface Exception {
    parent: string,
    data: {
        [key: string] : string[]
    }
}

interface OrderItem {
    fabric_ref : {
        fabric: OrderItemInfo;
        [key: string] : any;
    };
    design : {
        [key: string] : OrderItemInfo;
    };
    [key: string] : any;
}

interface ServerItem {
    design: {
        ourCode: string;
        value?: string;
    };
    additionalFabric?: {
        ourCode: string;
    },
}

interface ServerOrder {
    customer?: User;
    items: ServerItem[];
    mainFabric: {
        ourCode: string;
    };
    statusId: number;
    fittings?: {
        ourCode: string;
        value: number;
    }[];
}

interface MutuallyExclusive {
    activeItem: Translations<string> | undefined,
    activeSubgroup: Translations<string> | undefined,
    activeItemCode: string | undefined,
    exceptions: {
        exceptionItem: Translations<string> | undefined,
        exceptionSubgroup: Translations<string> | undefined        
    }[]
    onClick: (func: any) => void // tslint:disable-line
    onClose: (func: any) => void // tslint:disable-line
    show: boolean
}