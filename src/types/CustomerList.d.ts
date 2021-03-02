type TSelectedStoreId = null | number;
type TSetSelectedStoreId = (id: number) => void;
type TSetUsersStoreFiles = (data: IUsersStoreItems) => void;
type TRemoveSpecificFileFromItem = (file: File, id: number) => void;
type TSetTextInputFields = (data: IInputsData) => void;
type TSubmitUserStoreItems = () => void;
type TError = Error | null;
type TSetAnonUserInfo = (anonUserInfo: IAnonUserInfo) => void;

interface IInputsData {
  id: TSelectedStoreId;
  title: string;
  fields: string[];
  files: File[];
  // tslint:disable-next-line:no-any
  textInputs: Record<any, string>;
}

interface IAnonUserInfo {
  name: string;
  email: string;
}

interface IUsersStoreItems {
  id: TSelectedStoreId;
  title: string;
  files: File[];
  fields: string[];
  // tslint:disable-next-line:no-any
  textInputs: Record<any, string>;
}

interface ICustomerStore {
  isFetching: boolean;
  error: TError;
  storeError: TError;
  customers: User[];
  // tslint:disable-next-line:no-any
  fetch: () => Promise<any>;
  selectedStoreId: TSelectedStoreId;
  setSelectedStoreId: TSetSelectedStoreId;
  usersStoreItems: IUsersStoreItems[];
  setUsersStoreFiles: TSetUsersStoreFiles;
  removeSpecificFileFromItem: TRemoveSpecificFileFromItem;
  submitUserStoreItems: TSubmitUserStoreItems;
  setTextInputFields: TSetTextInputFields;
  anonUserInfo: IAnonUserInfo;
  setAnonUserInfo: TSetAnonUserInfo;
}
