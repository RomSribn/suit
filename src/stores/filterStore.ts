import { observable, action } from 'mobx';
import { callApi } from '../utils/apiAxios';
import { order } from './order';
import garments from './garments/garments';
import * as _ from 'lodash';

class FilterStore implements IFilterStore {
  @observable isOpen = false;
  @observable isFetching = false;
  @observable error: Error;
  @observable selectedItems = {};
  @observable
  filters: Filters | null = null;

  @observable
  userFilters: UserFilters = {
    shirt: {},
    jacket: {},
    pants: {},
  };

  @action
  toggleOpen = () => {
    this.isOpen = !this.isOpen;
  };
  @action
  closeFilter = () => {
    this.isOpen = false;
  };
  @action
  loadFilters = (url: string, garment: string) => {
    callApi(
      { url, method: 'GET' },
      () => {
        this.isFetching = true;
      },
      (filters: ServerFilters) => {
        this.filters = {
          ...this.filters,
          [garment]: Object.keys(filters).reduce((acc, filterName) => {
            const title = filters[filterName][0].title;
            const values = filters[filterName].map((filter) => ({
              value: filter.value,
              id: filter.id,
              valueTitle: filter.valueTitle,
            }));
            acc[filterName] = {
              name: filterName,
              title,
              values,
            };
            return acc;
          }, {}),
        };
      },
      (e: Error) => (this.error = e),
    ).then(() => (this.isFetching = false));
  };

  @action
  addUserFilter: UserFilterAction = (filterName) => (value) => {
    this.userFilters = {
      ...this.userFilters,
      [garments.currentActiveGarment]: {
        ...this.userFilters[garments.currentActiveGarment],
        [filterName]: _.union(
          this.userFilters[garments.currentActiveGarment][filterName],
          [value],
        ),
      },
    };
  };
  @action
  removeUserFilter: UserFilterAction = (filter) => (value) => {
    this.userFilters = {
      ...this.userFilters,
      [garments.currentActiveGarment]: {
        ...this.userFilters[garments.currentActiveGarment],
        [filter]: (
          this.userFilters[garments.currentActiveGarment][filter] || []
        ).filter((v: string) => v !== value),
      },
    };
  };
  @action
  removeUserGroupFilter: UserFilterGroupAction = (filter) => {
    const userFilters = {
      ...this.userFilters,
    };
    delete userFilters[garments.currentActiveGarment][filter];
    this.userFilters = userFilters;
  };

  @action
  clearUserFilters = (): void => {
    this.userFilters = {
      shirt: {},
      jacket: {},
      pants: {},
    };
  };

  @action
  clearFilters = (): void => {
    this.filters = null;
  };

  @action
  setSelectedItems = (props: ISetSelectedItemsProps) => {
    const { our_code, garment, group, subGroup } = props;
    const { partOfShirtToggle } = order;
    const newSelectedItems = { ...this.selectedItems };
    if (!newSelectedItems[garment]) {
      newSelectedItems[garment] = {};
    }
    if (!newSelectedItems[garment][group]) {
      newSelectedItems[garment][group] = {};
    }
    if (garment === 'shirt' && group === 'fabric_ref') {
      newSelectedItems[garment][group][partOfShirtToggle] = our_code;
      this.selectedItems = newSelectedItems;
      return;
    }
    if (!newSelectedItems[garment][group][subGroup]) {
      newSelectedItems[garment][group][subGroup] = {};
    }
    newSelectedItems[garment][group][subGroup] = our_code;
    this.selectedItems = newSelectedItems;
  };

  @action
  clearSelectedItems = () => {
    this.selectedItems = {};
  };
  isActive = (filterName: string) => (value: string) =>
    (
      this.userFilters[garments.currentActiveGarment][filterName] || []
    ).includes(value);
}

const filterStore = new FilterStore();
export { filterStore };
