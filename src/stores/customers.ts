import { observable, action } from 'mobx';
import { callApi } from '../utils/apiAxios';
import { services } from '../config/routes';

class CustomersStore implements ICustomerStore {
  @observable isFetching = false;
  @observable error: Error | null = null;
  @observable storeError: Error | null = null;
  @observable customers = observable.array<User>();
  @observable selectedStoreId: TSelectedStoreId = 1;
  @observable usersStoreItems: IUsersStoreItems[] = observable.array();

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
  };

  @action
  setUsersStoreFiles = (data: IUsersStoreItems) => {
    this._setUsersStoreItems('files', data);
  };

  @action
  removeSpecificFileFromItem = (file: File, id: number) => {
    this.usersStoreItems = this.usersStoreItems!.map((item) => {
      if (item.id === id) {
        return {
          ...item,
          files: item.files.filter((itemFile) => itemFile.name !== file.name),
        };
      }
      return item;
    });
  };
  @action
  setTextInputFields = (data: IInputsData) => {
    this._setUsersStoreItems('textInputs', data);
  };

  @action
  submitUserStoreItems = () => {
    const currentItems = this.usersStoreItems.find(
      (item) => item.id === this.selectedStoreId,
    );
    if (!currentItems) {
      this._onStoreError(new Error('The fields are empty!'));
      return;
    }

    this.storeError = null;

    return callApi(
      {
        url: services.shopData,
        method: 'POST',
        data: currentItems,
      },
      (): null => null,
      (): null => null,
      this._onError,
    );
  };

  _setUsersStoreItems = (
    itemId: 'textInputs' | 'files',
    data: IUsersStoreItems,
  ) => {
    const currentUsersItems = this.usersStoreItems.find(
      (item) => item.id === data.id,
    );

    if (!currentUsersItems) {
      this.usersStoreItems.push(data);
      return;
    }

    const newData = this.usersStoreItems.map((item) => {
      if (item.id === currentUsersItems.id) {
        return {
          ...item,
          [itemId]: data[itemId],
        };
      }
      return item;
    });

    this.usersStoreItems = newData;
  };

  _onSuccess = (data: User[]) => {
    this.customers = observable.array(data);
    this.isFetching = false;
  };
  _onError = (e: Error) => {
    this.error = e;
    this.isFetching = false;
  };
  _onStoreError = (e: Error) => {
    this.storeError = e;
  };
}

export default new CustomersStore();
