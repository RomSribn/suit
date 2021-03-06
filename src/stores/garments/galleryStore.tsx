import { observable, action } from 'mobx';
import { API_ROOT } from '../../config/routes';
import { callApi } from '../../utils/apiAxios';

// TODO: Перейти на синглтон
let currentItems: GalleryStoreItem[] = [];

class GalleryStore implements GalleryStore {
  garment: string;
  subGroup: string;
  group: string;
  items = observable<GalleryStoreItem>([]);
  @observable filters = {} as ServerFilters;
  @observable isfetching = false;
  @observable error = {};

  constructor(garment: string, subGroup: string, group: string) {
    this.garment = subGroup === 'fitting' ? 'shirt' : garment;
    this.subGroup = subGroup;
    this.group = group;
    this.fetch();
  }
  @action fetch = () => {
    const group = this.group === 'fabric_ref' ? '' : this.group;
    Promise.all([
      callApi(
        {
          url: `${API_ROOT}/api/garments/${this.garment}/${this.subGroup}/${group}`,
          method: 'GET',
        },
        () => {
          this.isfetching = true;
        },
        // TODO: remove after api added isInput field
        this._fetchSucceed(group === 'fitting'),
        this._fetchError,
      ),
      // TODO: remove this shit
      callApi(
        {
          url: `${API_ROOT}/api/garments/${this.garment}/filters/fabric`,
          method: 'GET',
        },
        this._filtersLoaded,
        this._fetchError,
      ),
    ]).then(() => (this.isfetching = false));
  };
  _filtersLoaded = (filters: ServerFilters) => {
    this.filters = filters;
  };

  _fetchSucceed = (isFitting: boolean) => (items: GalleryStoreItems) => {
    const _items = [
      ...items
        .filter((i) => Boolean(i.img_url_2d || i.is_input || isFitting))
        .map((i) => {
          return i.is_input || isFitting
            ? i
            : {
                ...i,
                img_url_2d: API_ROOT + i.img_url_2d!.replace('/html', ''),
              };
        }),
    ];
    this.items.push(..._items);
    currentItems = _items;
  };
  _fetchError = (e: Error) => {
    this.error = e;
    this.isfetching = false;
  };
}

export { GalleryStore, currentItems };
