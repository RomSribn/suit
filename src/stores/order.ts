import { observable, action } from 'mobx';
import * as _ from 'lodash';
import { ERRORS_CODES } from '../config/constants';
import { callApi } from '../utils/apiAxios';
import { services } from '../config/routes';

const STOP_CODES = ['trousers', 'body', 'shoes', 'eyes', 'head'];

type PrepareOrder = (order: Order, customer: User) => ServerOrder;
const prepareOrder: PrepareOrder = (order, customer) => {
    const items: ServerItem[] =
        _.values(order)
        .reduce((acc: ServerItem[], garment: OrderItem): ServerItem[] => {
            _.values(garment[0].design).forEach(item => {
                if (!STOP_CODES.includes(item.our_code)) {
                    acc.push({
                        design: {
                            ourCode: item.our_code
                        }
                    });
                }
            });
            return acc;
    }, []);
    return {
        customer,
        items,
        statusId: 1,
        mainFabric: {
            ourCode: order.shirt[0].fabric_ref.fabric.our_code
        }
    };
};

class OrderStore implements IOrderStore {
    @observable orderInfo: OrderInfo | null = null;
    @observable defaultValues: Order | null = null;
    @observable order: Order = {} as Order;
    @observable activeElement: GalleryStoreItem | null = null;
    @observable previewElement: ActivePreviewElement | null = null;
    @observable hiddenElements = observable.array<string>();
    @observable isFetching = false;
    @observable error: object | null = null;

    isEmptyOrder = () => _.isEmpty(this.order);

    @action
    toggleHiddenElement = (element: string) => {
      if (!this.hiddenElements.remove(element)) {
        this.hiddenElements.push(element);
      }
    }
    @action
    clearElement = (garment: string, element: string) => {
        const newValue = this.order;
        const group = element === 'fabric' ? 'fabric_ref' : 'design';
        newValue[garment][0][group][element] = _.get(this, `defaultValues.${garment}[0]${group}.${element}`);
    }
    @action
    setFitting = (garment: string, fitting: { id: string; value: string}) => {
        this.order[garment][0].fitting[fitting.id] = fitting.value;
    }
    @action
    setGarmentValue(garment: string, value: any) { // tslint:disable-line
        this.order[garment] = value;
    }
    @action
    setPreviewElement = (value: ActivePreviewElement ) => {
        this.previewElement = value;
    }
    @action
    setOrder (_o: Order) {
        this.order = {..._o};
        this.updateOrderInfo();
    }
    @action
    setActiveItem = (item: GalleryStoreItem | null) => { // tslint:disable-line
        this.activeElement = item;
    }
    @action
    fetchInitialOrder = (
        garments: string[],
        callback?: (...args: any[]) => any // tslint:disable-line no-any
    ) => {
        this.error = null;        
        if (!garments.length) {
            this.error = {
                code: ERRORS_CODES.VALUES_NEEDED,
            };
        } else {
            callApi({
                method: 'get',
                url: services.garmentsDefaults
            }, () => { this.isFetching = true; },
            (data: any) => { // tslint:disable-line no-any
                this._onSuccess(data, callback);
            },
            this._onError);
        }
    }
    @action
    saveOrder = (customerInfo: User) => {
        const {orderInfo} = this;
        const method = orderInfo && orderInfo.orderId ? 'PUT' : 'POST';
        const id = orderInfo && orderInfo.orderId ? `/${orderInfo.orderId}` : '';
        return callApi({
            url: services.orders + id,
            method,
            data: prepareOrder(this.order, customerInfo),
        },
        (): null => null,
        (info: OrderInfo) => {
            this.orderInfo = info;
            return info;
        },
        this._onError
    );
    }
    @action
    updateOrderInfo = (customerInfo?: User) => {
        const userInfo = customerInfo || {
            name: '',
            phone: ''
        };
        return callApi({
            url: services.orderDeliveryInfo,
            method: 'POST',
            data: prepareOrder(this.order, userInfo),
        },
        (): null => null,
        (info: OrderInfo) => {
            this.orderInfo = info;
            return info;
        },
        this._onError
    );
    }
    _onSuccess = (data: any, callback: any) => { // tslint:disable-line
        const tmp = _.groupBy(data, 'garmentId'); // tslint:disable-line
        const defaultOrder = Object.keys(tmp).reduce((acc, cur) => {
            const x = {
              design: {},
              fabric_ref: {}
            };
            tmp[cur].forEach((_cur) => {
              if (_cur.subsectionOurCode !== 'fabric') {
                  _.set(x, `design.${_cur.subsectionOurCode}.our_code`, _.get(_cur, 'ourCode'));
                  _.set(x, `design.${_cur.subsectionOurCode}.title`, _.get(_cur, 'title'));
              } else {
                _.set(x, 'fabric_ref.fabric.our_code', _.get(_cur, 'ourCode'));
                _.set(x, 'fabric_ref.fabric.title', _.get(_cur, 'title'));
              }
            });
            acc[cur] = [x];
            return acc;
          }, {});
        this.setOrder(defaultOrder);
        this.defaultValues = defaultOrder;
        callback(Object.keys(defaultOrder).filter(garment => garment !== 'manequin'));
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
