import { observable, action } from 'mobx';
import { ERRORS_CODES } from '../config/constants';

const initialOrder = {
    versions: [{
        uuid: null,
        content: {
            shirt: [{
                fabric_ref : {
                    fabric: '1191',
                    },
                    design : {
                        collars: 'br',
                    }
            }],
            jacket: [{
                fabric_ref : {
                    fabric: '486_895_19',
                },
                design : {
                    model: 'gt42',
                }
            }],
            trousers: [{
                fabric_ref : {
                    fabric: '486_895_19',
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

class OrderStore {
    @observable order: Order = {} as Order;
    @observable isFetching = false;
    @observable error: object | null = null;
    @action
    setGarmentValue(garment: string, value: any) { // tslint:disable-line
        this.order[garment] = value;
    }
    @action
    setOrder (_o: Order) {
        this.order = _o;
    }

    @action
    fetchInitialOrder = (garments: string[]) => {
        this.error = null;        
        if (!garments.length) {
            this.error = {
                code: ERRORS_CODES.VALUES_NEEDED,
            };
        } else {
            console.log('fetching started'); // tslint:disable-line        
            this.isFetching = true;
            setTimeout(() => {
                this.order = initialOrder.versions[0].content;
                this.isFetching = false;
                this.error = null;
                console.log('fetching ended'); // tslint:disable-line             
            }, 1000);
        }
    }
}

const order: OrderStore = new OrderStore();

export {
    order,
};