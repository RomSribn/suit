import { observable, action } from 'mobx';
import * as _ from 'lodash';
import { ERRORS_CODES } from '../config/constants';
// import { callApi } from '../utils/apiAxios';
// import { services } from '../config/routes';

const initialOrder = {
    versions: [{
        uuid: null,
        content: {
            shirt: [{
                fabric_ref : {
                    fabric: '1001',
                    },
                    design : {
                        collars: 'br',
                    }
            }],
            jacket: [{
                fabric_ref : {
                    fabric: '486.895/19',
                },
                design : {
                    model: 'gt16',
                }
            }],
            trousers: [{
                fabric_ref : {
                    fabric: '486.895/19',
                    },
                    design : {
                    model: '2P10 SLIM',
                    }
            }],

        },
        dateCreated: null,
        dateUpdated: null,
    }]
};

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
        // debugger // tslint:disable-line        
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
        //     callApi({
        //         method: 'get',
        //         url: services.garmentsDefaults
        //     }, () => this.isFetching = true,
        //     this._onSuccess,
        //     this._onError
        // );
        
            setTimeout(() => {
                this.order = initialOrder.versions[0].content;
                this.isFetching = false;
                this.error = null;
            }, 1000);
        }
    }

    _onSuccess = (data: any) => { // tslint:disable-line
        debugger // tslint:disable-line
        this.order = _.groupBy(data, 'garmentId');
        this.isFetching = false;
        this.error = null;
    }

    _onError = (e: Error) => {
        debugger // tslint:disable-line
        this.error = e;
        this.isFetching = false;
    }
}

const order: OrderStore = new OrderStore();

export {
    order,
};