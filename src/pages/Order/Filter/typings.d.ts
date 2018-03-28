interface _FilterProps {
    lang?: string;
    filterGroups?: FilterGroup[];
    isOpen?: boolean;
}
interface DefaultFilterProps {
    filterGroups: FilterGroup[];
    isOpen: boolean;
}
type FilterProps = _FilterProps & DefaultFilterProps;

interface _ControllProps {
    isOpen?: boolean;
    type?: string;
    onCLick?: () => void;
    closeFilter?: () => void;
    toggleOpen?(): void;
}
interface DefaultControllProps {
    isOpen: boolean;
    type: string;
    onCLick: () => void;
}

type ControllProps = _ControllProps & DefaultControllProps;