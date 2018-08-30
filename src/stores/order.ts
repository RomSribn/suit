import { observable, action } from 'mobx';
import * as _ from 'lodash';
import { ERRORS_CODES } from '../config/constants';
import { callApi } from '../utils/apiAxios';
import { services } from '../config/routes';

class OrderStore implements OrderStore {
    @observable order: Order = {} as Order;
    @observable activeElement: GalleryStoreItem | null = null;
    @observable previewElement: ActivePreviewElement | null = null;
    @observable isFetching = false;
    @observable error: object | null = null;

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
    }
    @action
    setActiveItem = (item: GalleryStoreItem | null) => {
        this.activeElement = item;
    }
    @action
    fetchInitialOrder = (garments: string[]) => {
        this.error = null;        
        if (!garments.length) {
            this.error = {
                code: ERRORS_CODES.VALUES_NEEDED,
            };
        } else {
            callApi({
                method: 'get',
                url: services.garmentsDefaults
            }, () => this.isFetching = true,
            this._onSuccess,
            this._onError
        );
        }
    }

    _onSuccess = (data: any) => { // tslint:disable-line
        const tmp = _.groupBy(data.filter((g:any) => g.garmentId !== 'manequin'), 'garmentId'); // tslint:disable-line
        this.order = Object.keys(tmp).reduce((acc, cur) => {
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
        this.isFetching = false;
        this.error = null;
    }

    _onError = (e: Error) => {
        this.error = e;
        this.isFetching = false;
    }
}

const order: OrderStore = new OrderStore();

export {
    order,
};