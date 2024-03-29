interface NavigationRoutes {
  index: string;
  order: string;
  panel: string;
  customersList: string;
  calendar: string;
  store: string;
  analytics: string;
  settings: string;
  ordersList: string;
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
  };
  path: string;
  url: string;
  isExact: boolean;
}

interface Location {
  pathname: string;
}

type Translations<Locale> = {
  en: Locale;
  ru: Locale;
};

type MakeLocale<Locale> = Translations<Locale> | (() => Translations<Locale>);

interface OrderPathItem {
  value: string;
  link?: string;
  id?: string;
}

type OrderPath = OrderPathItem[];

type Lang = 'ru' | 'en';

interface AppStore {
  lang: Lang;
  orderPath: OrderPath;
}

interface GarmentLocale {
  name: string;
}
interface Garment {
  titles?: MakeLocale<GarmentLocale>;
  isSubclear?: boolean;
  id: string;
  name: string;
}

interface Garments {
  [key: string]: Garment;
}
interface ImageLoadState {
  load: {
    error: string | null;
    success: string | null;
  };
}

interface ServerFilter {
  name: string;
  id: number;
  title: Translations<string>;
  value: string;
  valueTitle: Translations<string>;
}

type ServerFilters = Record<string, ServerFilter[]>;

interface FilterValue {
  id?: number;
  valueTitle: Translations<string>;
  value: string;
}
interface Filter {
  name: string;
  title: Translations<string>;
  values: FilterValue[];
}

type Filters = {
  shirt?: Filter;
  pants?: Filter;
  jacket?: Filter;
};

type UserFilters = {
  shirt: Filter | {};
  pants: Filter | {};
  jacket: Filter | {};
};

interface GalleryStoreItem {
  prevActiveItem?: string | null;
  our_code: string;
  title: Translations<string>;
  description: Translations<string>;
  exception: string[];
  is_input: boolean;
  is_item_clear: boolean;
  image: string | null;
  img_url_2d: string;
  img_url_2d_list: string;
  image_url_3d: string | null;
  price_category: string | null;
  code: string;
  price: Translations<number>;
  defaultItem: boolean;
  fabric_code: string;
  manufacturer: { id: number; manufacturerName: string };
  catalog: { id: number; catalogName: string };
  elementInfo: {
    garment: string;
    group: string;
    subGroup: string;
  };
}

type GalleryStoreItems = GalleryStoreItem[];

interface Stores {
  app: AppStore;
  routing: any;
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

interface IOurCodesToSubgroup {
  jacket: {
    bak: string;
    buo: string;
    cpk: string;
    mdl: string;
    pks: string;
    sle: string;
  };
  pants: {
    mds: string;
  };
  shirt: {
    bck: string;
    btc: string;
    btn: string;
    clr: string;
    cfs: string;
    frt: string;
    hem: string;
    irt: string;
    inc: string;
    ist: string;
    slv: string;
    yke: string;
  };
}

interface IDummyAssetsId {
  bak: string;
  buo: string;
  cpk: string;
  mdl: string;
  pks: string;
  sle: string;
  mds: string;
  bck: string;
  btc: string;
  btn: string;
  clr: string;
  cfs: string;
  frt: string;
  hem: string;
  irt: string;
  inc: string;
  ist: string;
  slv: string;
  yke: string;
}
