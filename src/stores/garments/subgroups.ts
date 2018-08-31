import { observable, action, computed } from 'mobx';
import { callApi } from '../../utils/apiAxios';
import { API_ROOT, services } from '../../config/routes';

type Cache = Record<string, SubgroupsI>;
const cache: Cache = {};

class Subgroups {

    @observable garment: string;
    @observable data: SubgroupsI | null = null;
    @observable isFetching = false;
    @observable error = {};

    @computed get subgroups(): Subgroup[] {
        return !!this.data
            ? [ ...this.data.fabric_ref, ...this.data.design, ...this.data.fitting, ]
            : [];
    }
    constructor(garment: string) {
        this.garment = garment;
        this.fetch(garment);
    }
    @action
    fetchSubroup = (garment: string, subgroup: string) => {
        return callApi(
            {
                url: `${API_ROOT}/${services.garments}/${garment}/${subgroup}`,
                method: 'GET',
             },
            () => this.isFetching = true,
            () => null,
            (e: Error) => {
                console.log('error', e); // tslint:disable-line
                this.error = e;
                this.isFetching = false;
            }).then((response:any): Subgroup[] => { //tslint:disable-line
                return response.data;
            });
    }
    @action
    fetch = (garment: string) => {
        if (cache[garment]) {
            this.data = cache[garment];
            this.isFetching = false;
            return;
        }
        Promise.all([
            this.fetchSubroup(garment, 'design'),
            this.fetchSubroup(garment, 'fabric_ref'),
            this.fetchSubroup(garment, 'fitting')
        ]).then((values: Subgroup[][]) => {
            const data = {
                design: values[0],
                fabric_ref: values[1],
                fitting: values[2]
            };
            this.data = data;
            cache[garment] = data;
            this.isFetching = false;
        }).catch((e) => {
            this.error = e;
            this.isFetching = false;
        });
    }
}

export {
    Subgroups,
};