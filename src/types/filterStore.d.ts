type EmptyFunction = () => void;
type UserFilterAction = (filtername: string) => (value: string) => void;

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
    clearUserFilters: EmptyFunction;
    clearFilters: EmptyFunction;
}
