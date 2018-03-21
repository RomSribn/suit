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

type MakeLocale<Locale> = (() => {
    en: Locale,
    ru: Locale,
}) | {
    en: Locale,
    ru: Locale,
}

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
    code: string;
    iamge: string;
    titles?: MakeLocale<GarmentLocale>;
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
    title_en: string;
    title_ru: string;
    title: string;
    image: string | null;
    image_url_2d: string[] | null;
    image_url_3d: string | null;
    price_category: string | null;
    code: string;
    price: string;
    defaultItem: boolean;
    fabric_code: string;
}

type GalleryStoreItems = GalleryStoreItem[];

interface Stores {
    app: AppStore;
    routing: any;
  }


interface Order {
    shirt: {
        fabric_ref : {
            fabric: string;
            [key: string] : any;
        
        };
        design : {
            collars: string;
            [key: string] : any;
        };
        [key: string] : any;
    }[],
    jacket: {
        fabric_ref : {
            fabric: string;
            [key: string] : any;            
        };
        design : {
            model: string;
            [key: string] : any;            
        };
        [key: string] : any;        
    }[],
    trousers: {
        fabric_ref : {
            fabric: string;
               [key: string] : any;            
        };
        design : {
            model: string;
            [key: string] : any;            
        };
    }[],
}

declare class OrderStore {
    order: Order;
    isFetching: boolean;
    error: object | null;
    setGarmentValue(garment: string, value: any): void;
    setOrder (_o: Order): void;
    fetchInitialOrder(garments: string[]): void;
}