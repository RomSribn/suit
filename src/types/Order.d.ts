type TSetOrderDummyParams = (acriveGarments: string[]) => void;
type TClearElement = (garment: string, element: string, actionType: ClearElementActionType) => void;
type TSetMutuallyExclusivePopup = (callbackFunction: any) => void
type TSetFitting = (garment: string, fitting: { id: string; value: number }) => void;
type TGetFitting = (garment: string) => (fittingName: string) => number;
type TSetPartOfShirtToggle = (value: string) => void;
type TClearAdditionalFabric = (garment: string) => void;
type TSetActiveItem = (item: GalleryStoreItem | null) => void;
type TSetGarmentValue = (garment: string, value: any) => void;
type TSetOrder = (_o: Order, exception?: OrderItemException) => void;
type TSaveOrder = (customerInfo?: User) => Promise<any>;
type TUpdateOrderInfo = (order: Order, customerInfo?: User) => Promise<any>;
type TToggleHiddenElement = (element: string) => void;
type TSetShirtInitials = (initials: string) => void;
type TFetchOrder = (orderId: string, superUserToken?: string) => Promise<any>;
type TFetchInitialOrder = (garments: string[], callback?: (...args: any[]) => any) => Promise<any>;
type TSetFocusableGarment = (our_code: string) => void;

interface IOrderStore {
    orderInfo: OrderInfo | null;
    defaultValues: Order | null;
    hiddenElements: string[];
    hiddenGarments: IHiddenGarments;
    order: Order;
    isFetching: boolean;
    activeSubGroup: string;
    prevActiveItem?: string | null;
    exceptions: OrderItemException | null;
    defaultExceptions: OrderItemException | null;
    mutuallyExclusivePopup: MutuallyExclusive | null;
    focusableGarment: string;
    isEmptyOrder: () => boolean;
    clearElement: TClearElement;
    clearException: TClearElement;
    setMutuallyExclusivePopup: TSetMutuallyExclusivePopup;
    activeElement: GalleryStoreItem | null;
    previewElement: ActivePreviewElement | null;
    error: object | null;
    setFitting: TSetFitting;
    getFitting: TGetFitting;
    partOfShirtToggle: string;
    setPartOfShirtToggle: TSetPartOfShirtToggle;
    clearAdditionalFabric: TClearAdditionalFabric;
    setActiveItem: TSetActiveItem;
    setGarmentValue: TSetGarmentValue;
    setOrder: TSetOrder;
    saveOrder: TSaveOrder;
    updateOrderInfo: TUpdateOrderInfo;
    toggleHiddenElement: TToggleHiddenElement;
    setShirtInitials: TSetShirtInitials;
    getShirtInitials(): string;
    fetchOrder: TFetchOrder;
    fetchInitialOrder: TFetchInitialOrder;
    clearOrderInfo: () => void;
    setOrderDummyParams: TSetOrderDummyParams;
    setHiddenGarments: TSetOrderDummyParams;
    setFocusableGarment: TSetFocusableGarment;
}

interface Order {
    [key: string]: OrderItem;
}

interface IHiddenGarments {
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