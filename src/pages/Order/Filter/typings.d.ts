interface _FilterProps {
    lang?: string;
    filters?: Filters;
    filterStore?: IFilterStore;
    isOpen?: boolean;
}
interface DefaultFilterProps {
    filters: Filters;
    isOpen: boolean;
    lang: string;
}
type FilterProps = _FilterProps & DefaultFilterProps;

interface DefaultFilterItemProps {
    lang?: string;
    type?: string;
    isColorGroup?: boolean;
    group: string;
    addFilter: (value: string) => void;
    removeFilter: (value: string) => void;
}
type FilterItemProps = FilterValue & DefaultFilterItemProps

interface _ControllProps {
    isOpen?: boolean;
    isSearchBarOpened?: boolean;
    type?: string;
    onCLick?: () => void;
    closeFilter?: () => void;
    toggleOpen?(): void;
    filterStore?: IFilterStore;
    app?: IAppStore;
}
interface DefaultControllProps {
    isSearchBarOpened: boolean;
    isOpen: boolean;
    type: string;
    onCLick: () => void;
    filterStore?: {};
    app?: {};
}

type ControllProps = _ControllProps & DefaultControllProps;