type TSelectedStoreId = null | number;
type TSetSelectedStoreId = (id: number) => void;
type TSetUsersStoreItems = (data: IUsersStoreItems) => void;
type TRemoveSpecificFileFromItem = (file: File, id: number) => void;
type TSubmitUserStoreItems = () => void;

interface IUsersStoreItems {
  id: TSelectedStoreId;
  title: string;
  files: File[];
  fields: string[];
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
  setUsersStoreItems: (data: IUsersStoreItems) => void;
  removeSpecificFileFromItem: TRemoveSpecificFileFromItem;
  submitUserStoreItems: TSubmitUserStoreItems;
}
