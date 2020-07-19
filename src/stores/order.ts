import { observable, action, get } from 'mobx';
import * as _ from 'lodash';
import { callApi } from '../utils/apiAxios';
import { services } from '../config/routes';

type CloneOrderObject = (order: Order) => Order;
const cloneOrderObject: CloneOrderObject = (order) => {
    // TODO: изменить эту сраную заглушку. нет времени заниматься нормальным переносом значений
    return JSON.parse(JSON.stringify(order));
};

const prepareDataFromServer: Fuckup.PrepareDataFromServer = (serverOrder) => {
    const res: Order = {};
    Object.keys(serverOrder.garments).forEach(garmentName => {
        const serverGarment = serverOrder.garments[garmentName];
        res[garmentName] = {} as OrderItem;
        const newGarment: OrderItem = res[garmentName];
        newGarment.fabric_ref = {
            fabric: {
                our_code: serverGarment.mainFabric.our_code,
                title: serverGarment.mainFabric.title
            }
        };

        // Секция Design
        newGarment.design = {};
        serverGarment.items.forEach(designItem => {
            const tmpDesign = { ...designItem };
            const newDesignValue: OrderItemInfo = {
                our_code: tmpDesign.design.our_code,
                title: tmpDesign.design.title,
                img_url_2d: tmpDesign.design.img_url_2d,
            };
            newGarment.design[tmpDesign.design.common.subsection_our_code] = newDesignValue;
        });

        serverGarment
            .fittings
            .map(
                fittingItem => ({value: fittingItem.value, ourCode: fittingItem.fitting.our_code})
            ).forEach(item => {
                if (!newGarment.fittings) {
                    newGarment.fittings = {};
                }
                newGarment.fittings[item.ourCode] = Number(item.value);
            });
        /**
         * Ублюдский хак из-за того, что по всей сторе сейчас
         * каждый из элементов одежды имеет массив
         */
        // TODO: Убрать к хуям эту поеботу и перебрать все места, где это въебывается в массив
        _.set(res, garmentName, observable.array<OrderItem>([newGarment]));
    });
    return res;
};

const STOP_CODES = ['trousers', 'body', 'shoes', 'eyes', 'head'];

type PrepareOrder = (order: Order, customer?: User) => ServerOrder;
const prepareOrder: PrepareOrder = (order, customer?) => {
    const items: ServerItem[] =
        _.values(order)
            .reduce((acc: ServerItem[], garment: OrderItem): ServerItem[] => {
                _.values(garment[0].design).forEach(item => {
                    if (!STOP_CODES.includes(item.our_code)) {
                        // TODO: Ну да. хуйня. Сейчас только инициалы хранятся в виде стринги
                        if (typeof item === 'string') {
                            acc.push({
                                design: {
                                    ourCode: 'int1',
                                    value: item
                                }
                            });
                        } else {
                            acc.push({
                                design: {
                                    ourCode: item.our_code
                                }
                            });
                        }
                    }
                });
                return acc;
            }, []);

    const fittings =
        _.union(
            ..._.values(order)
            .map(item => Object.entries(item[0].fittings || {}))
        ).reduce((acc, [fittingName, fittingValue]) => typeof fittingValue === 'number' ?
            [...acc, {ourCode: fittingName, value: fittingValue}] :
            acc,
        []);
    return {
        customer,
        items,
        statusId: 2,
        fittings,
        mainFabric: {
            ourCode: order.shirt[0].fabric_ref.fabric.our_code
        }
    };
};

export class OrderStore implements IOrderStore {
    @observable orderInfo: OrderInfo | null = null;
    @observable exceptions: OrderItemException | null = null;
    @observable defaultExceptions: OrderItemException | null = null;
    @observable defaultValues: Order | null = null;
    @observable order: Order = {} as Order;
    @observable activeElement: GalleryStoreItem | null = null;
    @observable activeSubGroup: string = '';
    @observable previewElement: ActivePreviewElement | null = null;
    @observable mutuallyExclusivePopup: MutuallyExclusive | null = null;
    @observable hiddenElements = observable.array<string>();
    @observable isFetching = false;
    prevActiveItem?: string | null = null;
    @observable error: object | null = null;

    isEmptyOrder = () => _.isEmpty(this.order);

    @action
    toggleHiddenElement = (element: string) => {
        if (!this.hiddenElements.remove(element)) {
            this.hiddenElements.push(element);
        }
    }
    @action
    clearElement = (garment: string, element: string, actionType: ClearElementActionType) => {
        const newValue = { ...this.order };
        const group = element === 'fabric' ? 'fabric_ref' : 'design';

        if (actionType === 'click') {
            if (element === 'initials_text') {
                newValue[garment][0][group][element] = '';
            } else {
                newValue[garment][0][group][element] =
                (
                    _.get(this, `defaultValues.${garment}[0].${group}.${element}.isItemClear`) &&
                    _.get(this, `defaultValues.${garment}[0].${group}.${element}.isSubClear`)
                )
                    ? null
                    : _.get(this, `defaultValues.${garment}[0].${group}.${element}`);
            }
        } else {
            newValue[garment][0][group][element] =
                (_.get(this, `defaultValues.${garment}[0].${group}.${element}.isItemClear`))
                    ? null
                    : _.get(this, `defaultValues.${garment}[0].${group}.${element}`);
        }

        if (newValue[garment][0][group][element] === null) {
            delete newValue[garment][0][group][element];
        }

        this.order = newValue;
    }
    @action
    setFitting = (garment: string, fitting: { id: string; value: number }) => {
        const newOrder = {...this.order};
        if (!newOrder[garment][0].fittings) {
            newOrder[garment][0].fittings = {};
        }
        newOrder[garment][0].fittings[fitting.id] = fitting.value;
        this.order = newOrder;
    }
    @get
    getFitting = (garment: string) => (fittingName: string): number => {
        return this.order[garment][0].fittings && this.order[garment][0].fittings[fittingName];
    }
    @action
    setGarmentValue(garment: string, value: any) { // tslint:disable-line
        this.order[garment] = value;
    }

    @action
    setPreviewElement = (value: ActivePreviewElement | null) => {
        if (!value) {
            this.previewElement = null;
        } else {
            this.previewElement = { ...value };
        }
    }

    @action
    setActiveSubGroup = (value: string) => {
        this.activeSubGroup = value;
    }

    @action
    setMutuallyExclusivePopup = (value: MutuallyExclusive) => {
        this.mutuallyExclusivePopup = { ...value };
    }

    @action
    isExclusivePopupShowing = () => _.get(this, 'mutuallyExclusivePopup.show', false)

    @action
    setOrder(_o: Order, exception?: OrderItemException | null) {
        this.order = { ..._o };
        this.updateOrderInfo();

        if (exception) {
            const garment = Object.keys(exception)[0];
            const subGroup = Object.keys(exception[garment])[0];

            if (this.activeElement) {
                this.prevActiveItem = subGroup;
            }

            if (this.exceptions === null) {
                this.exceptions = { ...exception };
            } else {
                if (this.exceptions[garment] && this.exceptions[garment][subGroup]) {
                    const nextExceptions = { ...this.exceptions };
                    nextExceptions[garment][subGroup].exceptions = exception[garment][subGroup].exceptions;
                    this.exceptions = nextExceptions;
                } else if (this.exceptions[garment]) {
                    this.exceptions[garment][subGroup] = {
                        exceptions: [''],
                        titleSubGroup: null,
                        titleElement: null,
                        is_item_clear: true
                    };
                    this.exceptions[garment][subGroup].exceptions = exception[garment][subGroup].exceptions;
                }
            }
        }
    }

    // TODO: заглушка для рубашки
    @action
    setShirtInitials = (initials: string) => {
        const newOrder = { ...this.order };
        newOrder.shirt[0].design.initials_text = initials;
        this.order = newOrder;
    }

    @action clearException = (garment: string, subGroup: string, actionType: ClearElementActionType): void => {
        if (actionType === 'click' && (this.exceptions !== null && this.exceptions[garment][subGroup])) {
            const newOrder = { ...this.order };
            const defaultDesign = _.get(this.defaultValues, `[${garment}][0].design`, {});

            // merge нужен чтобы скопировать exceptions массив внутри элементов
            const nextExceptions = _.merge({}, this.exceptions);
            let filteredItems: ExceptionItem[] = [];

            Object.keys(nextExceptions[garment]).forEach(elementKey => {
                if (elementKey === subGroup) {
                    nextExceptions[garment][elementKey].exceptions = [];
                    filteredItems.push(this.exceptions![garment][elementKey]);
                }
            });
            const defaultCodes = Object.keys(defaultDesign).map(defaultKey => {
                return defaultDesign[defaultKey].our_code;
            });
            const removedItems: string[] = [];
            filteredItems.forEach((filteredItem) => {
                filteredItem.exceptions.forEach(exception => {
                    if (defaultCodes.includes(exception)) {
                        removedItems.push(exception);
                    }
                });
            });
            removedItems.forEach(removedItem => {
                const defaultKeyForRemovedItem =
                    _.findKey(defaultDesign, ['our_code', removedItem]);

                const defaultObjectForRemovedItem: OrderItem
                    = defaultDesign[defaultKeyForRemovedItem!];
                if (!defaultObjectForRemovedItem!.isSubClear) {
                    newOrder[garment][0].design[defaultKeyForRemovedItem!]
                        = defaultObjectForRemovedItem;
                }
                nextExceptions[garment][defaultKeyForRemovedItem!].exceptions =
                    this.defaultExceptions![garment][defaultKeyForRemovedItem!].exceptions;
            });

            this.order = newOrder;
            this.exceptions = nextExceptions;
        } else if (this.exceptions !== null) {
            const nextExceptions = _.merge({}, this.exceptions);
            Object.keys(nextExceptions[garment]).forEach(elementKey => {
                if (elementKey === subGroup) {
                    nextExceptions[garment][elementKey].exceptions = [];
                }
            });

            this.exceptions = nextExceptions;
        }
    }

    @action
    setSubgroupTitle = (nextSubgroupTitle: string) => {
        this.activeSubGroup = nextSubgroupTitle;
    }

    @action
    getShirtInitials(): string {
        return this.order.shirt[0].design.initials_text;
    }

    @action
    setActiveItem = (item: GalleryStoreItem | null) => {
        this.activeElement = Object.assign({}, item);
        this.updateOrderInfo();
    }

    @action
    fetchInitialOrder = (
        garments: string[],
        callback?: (...args: any[]) => any // tslint:disable-line no-any
    ) => {
        return callApi({
            method: 'GET',
            url: services.garmentsDefaults
        }, () => { this.isFetching = true; },
            (data: any) => { // tslint:disable-line no-any
                this._onSuccess(data, callback);
            },
            this._onError);
    }
    @action
    fetchOrder = (orderId: string, superUserToken?: string) => {
        this.error = null;
        const config = {
            method: 'GET',
            url: `${services.orders}/${orderId}`,
        } as Axios.RequestConfig;

        if (superUserToken) {
            config.headers = { 'super-user-token': superUserToken };
        }

        return callApi(
            config,
            () => { this.isFetching = true; },
            (data: Fuckup.OrderFromServer) => {
                this.order = {
                    ...this.order,
                    ...prepareDataFromServer(data),
                };
                this.orderInfo = {
                    orderId: data.orderId,
                    deliveryDays: data.deliveryDays,
                    price: data.price,
                    customer: data.customer,
                    date: data.date,
                };
            },
            this._onError);
    }
    @action
    clearOrderInfo = () => {
        this.orderInfo = null;
    }
    @action
    saveOrder = (customerInfo?: User) => {
        const { orderInfo } = this;
        const method = orderInfo && orderInfo.orderId ? 'PUT' : 'POST';
        const id = orderInfo && orderInfo.orderId ? `/${orderInfo.orderId}` : '';
        return callApi({
            url: services.orders + id,
            method,
            data: prepareOrder(this.order, customerInfo ||  orderInfo!.customer),
        },
            (): null => null,
            (info: OrderInfo) => {
                if (this.defaultValues) {
                    this.order = cloneOrderObject(this.defaultValues);
                    this.orderInfo = null;
                    this.updateOrderInfo(this.order);
                }
                return info;
            },
            this._onError
        );
    }
    @action
    updateOrderInfo = (order: Order = this.order, customerInfo?: User) => {
        const userInfo = customerInfo || {
            name: '',
            phone: ''
        };
        const newOrder = cloneOrderObject(order);
        if (this.activeElement && this.activeElement.elementInfo) {
            if (this.activeElement.elementInfo.subGroup === 'fabric') {
                newOrder.shirt[0].fabric_ref.fabric.our_code = this.activeElement.our_code;
            } else {
                newOrder
                [this.activeElement.elementInfo.garment][0]
                [this.activeElement.elementInfo.group]
                [this.activeElement.elementInfo.subGroup] = this.activeElement.our_code;
            }
        }

        return callApi({
            url: services.orderDeliveryInfo,
            method: 'POST',
            data: prepareOrder(newOrder, userInfo),
        },
            (): null => null,
            (info: OrderInfo) => {
                this.orderInfo = {
                    ...this.orderInfo,
                    ...info
                };
                return info;
            },
            this._onError
        );
    }
    _onSuccess = (data: any, callback?: any) => { // tslint:disable-line
        const tmp = _.groupBy(data, 'garmentId'); // tslint:disable-line
        const nextExceptions = {};
        Object.keys(tmp).filter(garment => garment !== 'manequin').forEach((garmentKey) => {
            nextExceptions[garmentKey] = {};
        });
        const defaultOrder = Object.keys(tmp).reduce((acc, cur) => {
            const x = {
                design: {},
                fabric_ref: {}
            };
            tmp[cur].forEach((_cur) => {
                if (_cur.subsectionOurCode !== 'fabric' && !_cur.isSubclear) {
                    _.set(x, `design.${_cur.subsectionOurCode}.our_code`, _.get(_cur, 'ourCode'));
                    _.set(x, `design.${_cur.subsectionOurCode}.title`, _.get(_cur, 'title'));
                    _.set(x, `design.${_cur.subsectionOurCode}.isItemClear`, _.get(_cur, 'isItemClear'));
                    _.set(x, `design.${_cur.subsectionOurCode}.isSubClear`, _.get(_cur, 'isSubclear'));

                    nextExceptions[_.get(_cur, 'garmentId')] = {
                        ...nextExceptions[_.get(_cur, 'garmentId')],
                        [_.get(_cur, 'subsectionOurCode')]: {
                            exceptions: _.get(_cur, 'exception') ? _.get(_cur, 'exception')
                                .split(',')
                                .map((subException: string) => subException.trim())
                                .filter((subException: string) => subException !== '')
                                : [],
                            titleSubGroup: _.get(_cur, 'subsectionTitle'),
                            titleElement: _.get(_cur, 'title'),
                            is_item_clear: _.get(_cur, 'isItemClear')
                        }
                    };
                } else {
                    _.set(x, 'fabric_ref.fabric.our_code', _.get(_cur, 'ourCode'));
                    _.set(x, 'fabric_ref.fabric.title', _.get(_cur, 'title'));
                }
            });
            acc[cur] = [x];
            return acc;
        }, {});
        this.setOrder(defaultOrder);
        this.exceptions = nextExceptions;
        this.defaultExceptions = nextExceptions;

        this.defaultValues = defaultOrder;
        if (callback) {
            callback(Object.keys(defaultOrder).filter(garment => garment !== 'manequin'));
        }
        this.isFetching = false;
        this.error = null;
    }
    _onError = (e: Error) => {
        this.error = e;
        this.isFetching = false;
    }
}

const orderInstanse: OrderStore = new OrderStore();

export {
    orderInstanse as order,
};
