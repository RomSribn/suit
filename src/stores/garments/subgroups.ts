import { observable, action, computed } from 'mobx';
import { callApi } from '../../utils/apiAxios';
import { API_ROOT, services } from '../../config/routes';

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
    fetch = (garment: string) => {
        callApi(
            {
                url: `${API_ROOT}/${services.garments}/${garment}/subgroups`,
                method: 'GET',
             },
            () => this.isFetching = true,
            this._fetchSecceed,
            (e: Error) => {
                console.log('error', e); // tslint:disable-line
                this.error = e;
                this.isFetching = false;
            });
    }

    _fetchSecceed = (data: SubgroupsI) => {
        this.data = data;
        this.isFetching = false;
    }

}

export {
    Subgroups,
};