interface _FilterProps {
  lang?: string;
  filters?: Filters;
  filterStore?: IFilterStore;
  userFilters?: UserFilters;
  isOpen?: boolean;
  onClose?: () => void;
  currentActiveGarment?: string;
}
interface DefaultFilterProps {
  filters: Filters;
  isOpen: boolean;
  lang: string;
  onClose?: () => void;
  removeUserGroupFilter?: (value: string) => void;
  currentActiveGarment: string;
}
type FilterProps = _FilterProps & DefaultFilterProps;

interface DefaultFilterItemProps {
  lang?: string;
  type?: string;
  isColorGroup?: boolean;
  group: string;
  addFilter: (value: string) => void;
  removeFilter: (value: string) => void;
  removeUserGroupFilter: (value: string) => void;
  userFilters: {};
}
type FilterItemProps = FilterValue & DefaultFilterItemProps;

interface _ControllProps {
  isOpen?: boolean;
  isSearchBarOpened?: boolean;
  type?: string;
  onCLick?: () => void;
  closeFilter?: () => void;
  toggleOpen?: () => void;
  filterStore?: IFilterStore;
  app?: IAppStore;
  toggleIsSearchBarOpened?: () => void;
  openModal: () => void;
  disableBtn?: boolean;
  isClearFilters?: boolean;
  isFabric?: boolean;
}
interface DefaultControllProps {
  isSearchBarOpened: boolean;
  isOpen: boolean;
  type: string;
  onCLick: () => void;
  filterStore?: {};
  app?: {};
  toggleIsSearchBarOpened?: () => void;
}

type ControllProps = _ControllProps & DefaultControllProps;
