import { observable, action } from 'mobx';
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
  @observable activeGarments = observable.array();
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
        id,
      } = cur;
      acc[id] = cur;
      return acc; 
    };
    const list = data.reduce(reduceCallback, {});
    this.garmentsList = list;
    this.isFetching = false;
  }
  @action
  toggleGarment = (garment: string) => (_action: string) => {
    if (this.activeGarments.length < 2) {
      return;
    }
    if (_action === ADD) {
      if (this.activeGarments.findIndex(el => garment === el ) === -1) {
        this.activeGarments.push(garment);
      }
    } else if ( _action === REMOVE) {
        this.activeGarments.remove(garment);
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

  @action
  setChosenGarments = (garments: string[]) => {
      this.activeGarments = observable.array(garments);
  }
}

export default new GarmentsStore();
