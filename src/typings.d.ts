interface NavigationRoutes {
    index: string;
    order: string;
    panel: string;
    clientele: string;
    orders: string;
    calendar: string;
    tasks: string;
    analytics: string;
    settings: string;
}

interface Routes {
    details: string;
}


/**
 * Описываем что-то с бэка
 */
interface Match {
    params: {
        [key: string]: string;
    }
    path: string;
    url: string;
    isExact: boolean;
}

interface Location {
    pathname: string;
}


type Translations <Locale> = {
    en: Locale,
    ru: Locale,
}

type MakeLocale<Locale> = 
    Translations<Locale> |
    (() => Translations<Locale>)

interface OrderPathItem {
    value: string;
    link?: string;
}

type OrderPath = OrderPathItem[];

interface AppStore {
    lang: string;
    orderPath: OrderPath;
}

interface GarmentLocale {
    name: string;
}
interface Garment {
    // code: string;
    // image: string;
    titles?: MakeLocale<GarmentLocale>;
    // name?: string;
    id: string;
    name: string;
  }
  
interface Garments {
    [key: string]: Garment;
}
interface ImageLoadState {
    load: {
        error: string | null,
        success: string | null;
    },
}
interface GalleryStoreItem {
    id: string;
    title: {
        en: string;
        ru: string;
    };
    description: {
        en: string;
        ru: string;
    };
    image: string | null;
    img_url_2d: string;
    image_url_3d: string | null;
    price_category: string | null;
    code: string;
    price: {
        ru: number;
        en: number;
        eu: number;
    };
    defaultItem: boolean;
    fabric_code: string;
}

type GalleryStoreItems = GalleryStoreItem[];

interface Stores {
    app: AppStore;
    routing: any;
  }

interface OrderItem {
    fabric_ref : {
        fabric: string;
        [key: string] : any;
    
    };
    design : {
        // collars: string;
        [key: string] : any;
    };
    [key: string] : any;
}

interface Order {
    [key: string]: OrderItem[],
}

interface FilterItemProps {
    name: string,
    type?: string;
    label: string;
    value: string;
}

interface FilterGroup {
    name: string;
    filters: FilterItemProps[];
} 

declare class OrderStore {
    order: Order;
    isFetching: boolean;
    activeElement: GalleryStoreItem | null;
    previewElement: ActivePreviewElement | null;
    error: object | null;
    setGarmentValue(garment: string, value: any): void;
    setOrder (_o: Order): void;
    fetchInitialOrder(garments: string[]): void;
}

declare class GalleryStore {
    garment: string;
    subGroup: string;
    group: string;
}

type ActivePreviewElement = {
    garment: string;
    group: string;
    subGroup: string;
    value: string;
} | null;