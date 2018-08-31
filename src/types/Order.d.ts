interface IOrderStore {
    orderInfo: OrderInfo | null;
    defaultValues: Order | null;
    hiddenElements: string[];    
    order: Order;
    isFetching: boolean;
    activeElement: GalleryStoreItem | null;
    previewElement: ActivePreviewElement | null;
    error: object | null;
    setGarmentValue(garment: string, value: any): void;
    setOrder (_o: Order): void;
    saveOrder(): void;
    toggleHiddenElement(element: string): void;
    fetchInitialOrder(garments: string[]): void;
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
    title: string;
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
    customer: User;
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