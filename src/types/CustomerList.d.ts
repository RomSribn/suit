type TSelectedStoreId = null | number;
type TSetSelectedStoreId = (id: number) => void;
type TSetUsersStoreFiles = (data: IUsersStoreItems) => void;
type TRemoveSpecificFileFromItem = (file: File, id: number) => void;
type TSetTextInputFields = (data: IInputsData) => void;
type TSubmitUserStoreItems = () => void;

interface IInputsData {
  id: TSelectedStoreId;
  title: string;
  fields: string[];
  files: File[];
  // tslint:disable-next-line:no-any
  textInputs: any;
}

interface IUsersStoreItems {
  id: TSelectedStoreId;
  title: string;
  files: File[];
  fields: string[];
  // tslint:disable-next-line:no-any
  textInputs: any;
}

interface ICustomerStore {
  isFetching: boolean;
  error: Error | null;
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
}
