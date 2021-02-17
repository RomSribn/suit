import { observable, action, toJS } from 'mobx';
import { callApi } from '../utils/apiAxios';
import { services } from '../config/routes';
import { app } from './app';

class CustomersStore implements ICustomerStore {
  @observable isFetching = false;
  @observable error: Error | null = null;
  @observable storeError: Error | null = null;
  @observable customers = observable.array<User>();
  @observable selectedStoreId: TSelectedStoreId = 1;
  @observable usersStoreItems: IUsersStoreItems[] = observable.array();
  @observable anonUserInfo: IAnonUserInfo = { name: '', email: '' };

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
    const textInputs = currentItems && Object.values(currentItems!.textInputs);
    const isTextInputsExist = textInputs && textInputs.some((input) => !!input);
    const isFileExist = currentItems && currentItems.files.length;
    if (!currentItems || (!isTextInputsExist && !isFileExist)) {
      const errorMsg = {
        ru: 'Некоторые поля пустые!',
        en: 'Some fields are empty!',
      };
      this._onStoreError(new Error(errorMsg[app.lang]));
      return;
    }

    const data = toJS({
      ...currentItems,
      textInputs: Object.entries(currentItems.textInputs).flat(),
    });

    const formData = new FormData();

    for (let key in data) {
      if (key !== 'files') {
        formData.append(key, data[key]);
      }
    }
    for (let index = 0; index < data.files.length; index++) {
      formData.append(`file${index + 1}`, data.files[index]);
    }

    this.storeError = null;

    return callApi(
      {
        url: services.shopData,
        headers: {
          'content-type': 'multipart/form-data',
        },
        method: 'POST',
        data: formData,
      },
      (): null => null,
      (): null => null,
      this._onStoreError,
    );
  };

  @action
  setAnonUserInfo = ({ name, email }: IAnonUserInfo) => {
    this.anonUserInfo = { name, email };
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
