declare namespace OrderList {
    namespace ServerData{
        type allowedGarment = 'shirt';
        type allowedStatuses = 'TEMPORARY' | 'NEW' | 'IN_PROGRESS' | 'DONE';

        type CommonOptions = {
            is_allowOwnFabric: boolean;
            is_input: boolean;
            is_multiple: boolean;
            is_subclear: boolean;
            position: number;
            subsection_our_code: string;
            title: MakeLocale<string>;
        };

        type SubgroupValues = {
            common: CommonOptions;
            deliveryDays: number;
            dependent_subsection_our_codes: string[];
            description: MakeLocale<string>;
            exception: string[];
            img_url_2d: string;
            main_color: MakeLocale<string>;
            our_code: string;
            pattern: MakeLocale<string>;
            pattern_size: MakeLocale<string>;
            price: MakeLocale<string>;
            second_colors: MakeLocale<string>[];
            title: MakeLocale<string>;
            weight: MakeLocale<number>;
        };
        type ServerGarmentItem = {
            additionalFabric?: SubgroupValues;
            design: SubgroupValues;
            value: string;
        };

        interface OrderItem {
            customer?: User;
            date: string;
            deliveryDays: number;
            garments: {
                [key in allowedGarment]: {
                    fittingVersion: number;
                    fittings: [{
                        value: string;
                        fitting: {
                            is: number;
                            is_input: boolean;
                            is_multiple: boolean;
                            is_radio_field: boolean;
                            our_code: string;
                            price: MakeLocale<number>;
                            title: MakeLocale<string>;
                            fitting_elements: string[];
                            common: CommonOptions
                        }
                    }];
                    items: ServerGarmentItem[];
                    mainFabric: SubgroupValues;
                }
            }
            orderId: number;
            price: MakeLocale<number>;
            status: {
                statusId: number;
                name: allowedStatuses;
            };
        }

        interface List {
            items: OrderItem[];
            page: number;
            size: number;
            totalElements: number;
        }
    }
    interface IOrderStore<Data = ServerData.List> {
        isFetching: boolean;
        orders: ServerData.OrderItem[];
        fetch(): Promise<void | Axios.Response<Data>>;
        updateOrder(
            order: ServerData.OrderItem
        ): Promise<void | Axios.Response<{}>>;
    }
    type OrderItem = ServerData.OrderItem;
}
