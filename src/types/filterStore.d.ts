type EmptyFunction = () => void;
type UserFilterAction = (filtername: string) => (value: string) => void;
type UserFilterGroupAction = (filtername: string) => void;

declare interface ISetSelectedItemsProps {
    our_code: string;
    garment: string;
    group: string;
    subGroup: string;
}

declare interface IFilterStore {
    userFilters: UserFilters;
    isOpen: boolean;
    isFetching: boolean;
    error: Error;
    filters: Filters | null;
    toggleOpen: EmptyFunction;
    closeFilter: EmptyFunction;
    loadFilters: (url: string) => void;
    addUserFilter: UserFilterAction;
    removeUserFilter: UserFilterAction;
    removeUserGroupFilter: UserFilterGroupAction;
    clearUserFilters: EmptyFunction;
    clearFilters: EmptyFunction;
    clearSelectedItems: EmptyFunction;
}
