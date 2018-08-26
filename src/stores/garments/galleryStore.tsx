import { observable, action } from 'mobx';
import { API_ROOT } from '../../config/routes';
import { callApi } from '../../utils/apiAxios';

class GalleryStore implements GalleryStore {
    garment: string;
    subGroup: string;
    group: string;
    items = observable<GalleryStoreItem>([]);
    @observable isfetching = false;
    @observable error = {};

    constructor(
        garment: string,
        subGroup: string,
        group: string,
    ) {
        this.garment = garment;
        this.subGroup = subGroup;
        this.group = group;
        this.fetch();
    }
    @action fetch = () => {
        const group = this.group === 'fabric_ref'
            ? ''
            : this.group;
        callApi({
            url: `${API_ROOT}/api/garments/${this.garment}/${this.subGroup}/${group}`,
            method: 'GET',
        },
        () => this.isfetching = true,
        this._fetchSucceed,
        this._fetchError,
        );
    }
    _fetchSucceed = (items: GalleryStoreItems) => {
        debugger // tslint:disable-line
        this.items.push(
            ...items
            .filter(i => Boolean(i.img_url_2d))
            .map(i => ({
                ...i,
                img_url_2d: 'http://194.87.239.90' + i.img_url_2d!.replace('/html', '')
            }))
        );
        this.isfetching = false;
    }
    _fetchError = (e: Error) => {
        this.error = e;
        this.isfetching = false;
    }
}

export {
    GalleryStore,
};