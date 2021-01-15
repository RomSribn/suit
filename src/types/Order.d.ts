interface IOrderStore {
    orderInfo: OrderInfo | null;
    defaultValues: Order | null;
    hiddenElements: string[];
    order: Order;
    isFetching: boolean;
    activeSubGroup: string;
    prevActiveItem?: string | null;
    exceptions: OrderItemException | null;
    defaultExceptions: OrderItemException | null;
    mutuallyExclusivePopup: MutuallyExclusive | null,
    isEmptyOrder: () => boolean;
    clearElement: (garment: string, element: string, actionType: ClearElementActionType) => void;
    clearException: (garment: string, subGroup: string, actionType: ClearElementActionType) => void;
    setMutuallyExclusivePopup: (callbackFunction: any) => void;
    activeElement: GalleryStoreItem | null;
    previewElement: ActivePreviewElement | null;
    error: object | null;
    setFitting: (garment: string, fitting: { id: string; value: number }) => void;
    getFitting: (garment: string) => (fittingName: string) => number;
    partOfShirtToggle: string;
    setPartOfShirtToggle: (value: string) => void;
    clearAdditionalFabric: (garment: string) => void;
    setActiveItem(item: GalleryStoreItem | null): void;
    setGarmentValue(garment: string, value: any): void;
    setOrder(_o: Order, exception?: OrderItemException): void;
    saveOrder(customerInfo?: User): Promise<any>;
    updateOrderInfo(order: Order, customerInfo?: User): Promise<any>;
    toggleHiddenElement(element: string): void;
    setShirtInitials(initials: string): void;
    getShirtInitials(): string;
    fetchOrder(orderId: string, superUserToken?: string): Promise<any>;
    fetchInitialOrder(garments: string[], callback?: (...args: any[]) => any): Promise<any>;
    clearOrderInfo(): void;
    setOrderDummyParams: (acriveGarments: string[]) => void;
    setVisibleGarments: (acriveGarments: string[]) => void;
}

interface Order {
    [key: string]: OrderItem;
}

interface IVisibleGarments {
    shirt: string | null;
    jacket: string | null;
    pants: string | null;
}

interface OrderInfo {
    orderId: number;
    deliveryDays: number;
    price: Translations<string>;
    customer: User;
    date: string;
}

interface OrderItemInfo {
    our_code: string;
    is_subclear?: boolean;
    title: Translations<string>;
    img_url_2d?: string;
    additionalFabric?: string | null;
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
        [key: string]: string[]
    }
}

interface OrderItem {
    fabric_ref: {
        fabric: OrderItemInfo;
        [key: string]: any;
    };
    design: {
        [key: string]: OrderItemInfo;
    } & { initials_text?: string };
    fittings?: {
        [key: string]: number;
    };
    [key: string]: any;
}

type ClearElementActionType = 'default' | 'click'

interface OrderDesign {
    [key: string]: OrderItemInfo;
}

interface ServerItem {
    design: {
        ourCode: string;
        value?: string;
    };
    additionalFabric?: {
        ourCode: string;
    } | null,
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