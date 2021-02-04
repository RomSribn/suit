import { observable, action } from 'mobx';
import { callApi } from '../utils/apiAxios';
import { services } from '../config/routes';

class CustomersStore implements ICustomerStore {
  @observable isFetching = false;
  @observable error: Error | null = null;
  @observable customers = observable.array<User>();
  @observable selectedStoreId: number | null = null;

  @action
  fetch() {
    this.error = null;

    return callApi(
      {
        method: 'GET',
        url: services.customers,
        params: { searchType: 'CONFIRMED' },
      },
      () => {
        this.isFetching = true;
      },
      this._onSuccess,
      this._onError,
    );
  }

  @action
  setSelectedStoreId = (id: number) => {
    this.selectedStoreId = id;
  }

  _onSuccess = (data: User[]) => {
    this.customers = observable.array(data);
    this.isFetching = false;
  };
  _onError = (e: Error) => {
    this.error = e;
    this.isFetching = false;
  };
}

export default new CustomersStore();
