import { observable, action } from 'mobx';
import * as _ from 'lodash';
import { callApi } from '../utils/apiAxios';

class FilterStore implements IFilterStore {
    @observable isOpen = false;
    @observable isFetching = false;
    @observable error: Error;
    
    @observable
    filters: Filters | null = null;

    @observable
    userFilters: UserFilters = {};

    @action
    toggleOpen = () => { this.isOpen = !this.isOpen; }
    @action
    closeFilter = () => { this.isOpen = false; }
    @action
    loadFilters = (url: string) => {
        callApi({ url, method: 'GET'},
            () => this.isFetching = true,
            (filters: ServerFilters) => {
                this.filters = Object.keys(filters).reduce((acc, filterName) => {
                    const title = filters[filterName][0].title;
                    const values = filters[filterName].map(filter => ({
                        value: filter.value,
                        id: filter.id,
                        valueTitle: filter.valueTitle
                    }));
                    acc[filterName] = {
                        name: filterName,
                        title,
                        values
                    };
                    return acc;
                  }, {});
            },
            (e: Error) => this.error = e)
        .then(() => this.isFetching = false);
    }

    @action
    addUserFilter: UserFilterAction = (filterName) => (value) => {
        this.userFilters = {
            ...this.userFilters,
            [filterName]: _.union(this.userFilters[filterName], [value])
        };
    }
    @action
    removeUserFilter: UserFilterAction = (filter) => (value) => {
        this.userFilters = {
            ...this.userFilters,
            [filter]: (this.userFilters[filter] || []).filter(v => v !== value)
        };
    }
    @action
    clearUserFilters = (): void => { this.userFilters = {}; }

    @action
    clearFilters = (): void => { this.filters = null; }

    isActive = (filterName: string) => (value: string) => (this.userFilters[filterName] || []).includes(value);
}

const filterStore = new FilterStore();
export {
    filterStore,
};