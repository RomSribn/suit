declare namespace Fuckup {
  export interface Item {
    additionalFabric?: { ourCode: string };
    design: {
      ourCode: string;
      value: string;
    };
  }

  export interface Fitting {
    ourCode: string;
    value: string;
  }

  export interface OrderForServer {
    statusId: number;
    fittings: Fitting[];
    mainFabric: { ourCode: string };
    items: Item[];
  }
  interface DesignInfo {
    delivery_days: number;
    dependent_subsection_our_codes: string[];
    description: Translations<string>;
    exception: string[];
    img_url_2d: string;
    is_item_clear: boolean;
    main_color: Translations<string | null>;
    our_code: string;
    pattern: Translations<string | null>;
    pattern_size: Translations<string | null>;
    price: Translations<number>;
    second_colors: Translations<string | null>[];
    title: Translations<string>;
    weight: Translations<number | null>;
    common: {
      is_allowOwnFabric: boolean;
      is_input: boolean;
      is_multiple: boolean;
      is_subclear: boolean;
      position: number;
      subsection_our_code: string;
      title: Translations<string>;
    };
  }
  interface AdditionalFabric {
    delivery_days: number;
    dependent_subsection_our_codes: string[];
    description: Translations<string>;
    elementCode: string;
    exception: string[];
    geo_url_3d: string;
    img_url_2d: string;
    img_url_2d_list: string[];
    img_url_2d_thumbnail_list: string[];
    is_item_clear: boolean;
    main_color: Translations<string | null>;
    our_code: string;
    pattern: Translations<string | null>;
    pattern_size: Translations<string | null>;
    price: Translations<number>;
    second_colors: Translations<string | null>[];
    tex_url_3d: string;
    title: Translations<string>;
    weight: Translations<number | null>;
    common: {
      is_allowOwnFabric: boolean;
      is_input: boolean;
      is_multiple: boolean;
      is_subclear: boolean;
      position: number;
      subsection_our_code: string;
      title: Translations<string>;
    };
  }
  export interface OrderFromServer {
    orderId: number;
    price: Translations<string>;
    status: {
      id: number;
      name: string;
    };
    customer: User;
    date: string;
    deliveryDays: number;
    garments: {
      [key: string]: {
        fittingVersion: number;
        fittings: {
          value: string;
          fitting: {
            our_code: string;
          };
        }[];
        mainFabric: DesignInfo;
        items: {
          value: string | null;
          additionalFabric: AdditionalFabric;
          design: DesignInfo;
        }[];
      };
    };
  }

  export type PrepareDataForServer = (
    data: OrderList.OrderItem,
  ) => Fuckup.OrderForServer;
  export type PrepareDataFromServer = (data: Fuckup.OrderFromServer) => Order;
}
