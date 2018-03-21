import { observable, action, computed } from 'mobx';
import { callApi } from '../../utils/apiAxios';
import { API_ROOT, services } from '../../config/routes';
import GarmentStore from './garment';

export const ADD: string = 'ADD_ACTIVE_GARMENT';
export const REMOVE: string = 'REMOVE_ACTIVE_GARMENT';

type GarmentsFromServer = Garment[];
type GarmentsFromServerToGarmentsObject = (
  acc: Garments,
  cur: Garment,
) => Garments;

class GarmentsStore {
  @observable.shallow garmentsList = {};
  _activeGarments = observable.array();
  @observable active = '';
  @observable isFetching = false;
  @observable error = {};

  @action
  fetchGarmentsList = () => {
    callApi({
      method: 'GET',
      url: `${API_ROOT}/${services.garments}`,
    },
    () => this.isFetching = true,
    this.garmentsLoaded,
    (e: Error) => this.error);
  }
  garmentsLoaded = (data: GarmentsFromServer) => {
    const reduceCallback: GarmentsFromServerToGarmentsObject = (acc, cur) => {
      const {
        code,
      } = cur;
      acc[code] = cur;
      return acc;      
    };
    this.garmentsList = data.reduce(reduceCallback, {});
    this.isFetching = false;
  }
  @action
  toggleGarment = (garment: string) => (_action: string) => {
    if (_action === ADD) {
      if (this._activeGarments.findIndex(el => garment === el ) === -1) {
        this._activeGarments.push(garment);
      }
    } else if ( _action === REMOVE) {
        this._activeGarments.remove(garment);
    } else {
      // tslint:disable-next-line no-console
      console.error(`You have provided ${_action}-action which is not one of
      ${ADD} or ${REMOVE}`);
    }
  }
  @action
  setActiveGarment = (garment: string) => {
    let clickedGarment = this.garmentsList[garment];
    if (!clickedGarment) {
      clickedGarment = new GarmentStore(garment, this);
    }
    this.active = garment;    
  }

  @computed
  get activeGarments() {
    return this._activeGarments;
  }
}

export default new GarmentsStore();
