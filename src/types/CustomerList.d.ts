type TSelectedStoreId = null | number;
type TSetSelectedStoreId = (id: number) => void;

interface ICustomerStore {
  isFetching: boolean;
  error: Error | null;
  customers: User[];
  // tslint:disable-next-line:no-any
  fetch: () => Promise<any>;
  selectedStoreId: TSelectedStoreId;
  setSelectedStoreId: TSetSelectedStoreId;
}
