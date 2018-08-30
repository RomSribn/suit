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
    addFilter: (value: string) => void;
    removeFilter: (value: string) => void;
}
type FilterItemProps = FilterValue & DefaultFilterItemProps

interface _ControllProps {
    isOpen?: boolean;
    type?: string;
    onCLick?: () => void;
    closeFilter?: () => void;
    toggleOpen?(): void;
    filterStore?: IFilterStore
}
interface DefaultControllProps {
    isOpen: boolean;
    type: string;
    onCLick: () => void;
    filterStore?: {};
}

type ControllProps = _ControllProps & DefaultControllProps;