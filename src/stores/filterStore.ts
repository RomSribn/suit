import { observable, action } from 'mobx';

class FilterStore {
    @observable isOpen = false;
    @observable
    filterGroups: FilterGroup[];
    
    @action
    toggleOpen = () => { this.isOpen = !this.isOpen; }
    @action
    closeFilter = () => { this.isOpen = false; }

    @action
    setFilterGroups = (groups: FilterGroup[]) => { this.filterGroups = groups; }
}

const filterStore = new FilterStore();
export {
    filterStore,
};