import { observable, action } from 'mobx';
import { API_ROOT, services } from '../../config/routes';
import { basisPart } from '../../pages/Order/ToggleBar';
import { callApi } from '../../utils/apiAxios';
import { order } from '../order';
import GarmentStore from './garment';

export const ADD: string = 'ADD_ACTIVE_GARMENT';
export const REMOVE: string = 'REMOVE_ACTIVE_GARMENT';
//
// const GARMENTS_ORDER = [
//     'shirt'
// ];

type GarmentsFromServer = Garment[];
type GarmentsFromServerToGarmentsObject = (
  acc: Garments,
  cur: Garment,
) => Garments;

class GarmentsStore {
  @observable.shallow garmentsList = {};
  @observable activeGarments = observable.array();
  @observable currentActiveGarment = ''; // Гермент, что сейчас отображается в адрессной строке
  @observable active = '';
  @observable isFetching = false;
  @observable error = {};

  @action
  fetchGarmentsList = () => {
    callApi({
      method: 'GET',
      url: `${API_ROOT}/${services.garments}`,
    },
      () => { this.isFetching = true; },
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
    // Старая заглушка
    // if (this.activeGarments.length < 3) {
    //   return;
    // }
    if (_action === ADD) {
      // this.activeGarments = observable.array(); // <--- ДЛЯ ОДНОГО ГАРМЕНТА В РЯДУ ЗА РАЗ, СДЕЛАТЬ ДУБЛИКАТ
      if (this.activeGarments.findIndex(el => garment === el) === -1) {
        this.activeGarments.push(garment);
        this.currentActiveGarment = this.activeGarments[0];
      }
    } else if (_action === REMOVE) {
      this.activeGarments.remove(garment);
      this.currentActiveGarment = this.activeGarments[0];
      return;
    } else {
      // tslint:disable-next-line no-console
      console.error(`You have provided ${_action}-action which is not one of
      ${ADD} or ${REMOVE}`);
    }
  }
  @action
  setCurrentActiveGarment = (garment: string) => {
    this.currentActiveGarment = garment;
    order.setPartOfShirtToggle(basisPart);
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
    const garmentsArray = observable.array(garments);
    this.activeGarments = garmentsArray;
    this.currentActiveGarment = garmentsArray[0];
  }
}

export default new GarmentsStore();
