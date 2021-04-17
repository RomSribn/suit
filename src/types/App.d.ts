type TSetLoadedInfoProps = {
  itemsLoaded: TItemsLoaded;
  itemsTotal: TItemsTotal;
};
type TIsMenuUncoveredInitial = boolean;
type TSetIsMenuUncoveredInitial = (
  isMenuUncoveredInitial: TIsMenuUncoveredInitial,
) => void;
type TIsMenuUncovered = boolean;
type TSetIsMenuUncovered = (isMenuUncovered: TIsMenuUncovered) => void;
type TDummyY = number;
type TSetDummyY = (y: TDummyY) => void;
type TItemsLoaded = number;
type TItemsTotal = number;
type TSetLoadedInfo = ({
  itemsLoaded,
  itemsTotal,
}: TSetLoadedInfoProps) => void;
type TIsMenuHidden = boolean;
type TIsBackButtonDisabled = boolean;
type TSetIsMenuHidden = (isMenuHidden: TIsMenuHidden) => void;
type TIsDummyWasRendered = boolean;
type TSetIsDummyWasRendered = (isDummyWasRendered: TIsDummyWasRendered) => void;

interface IAppStore {
  addVisitedChoiceItem: (name: string) => void;
  changeSearchedItemsCount: () => void;
  clearVisitedChoiceItems: () => void;
  currentSearchValue: string;
  cutOrderPath: (value: string) => void;
  dummyY: TDummyY;
  isBackButtonDisabled: TIsBackButtonDisabled;
  isDummyWasRendered: TIsDummyWasRendered;
  isGarmentLoaded: boolean;
  isMenuHidden: TIsMenuHidden;
  isMenuUncovered: TIsMenuUncovered;
  isMenuUncoveredInitial: TIsMenuUncoveredInitial;
  isSearchBarOpened: boolean;
  itemsLoaded: TItemsLoaded;
  itemsTotal: TItemsTotal;
  lang: Lang;
  orderPath: OrderPathItem[];
  popOrderPathItem: EmptyFunction;
  pushOrderPathItem: (item: OrderPathItem) => void;
  removeVisitedChoiceItem: (name: string) => void;
  resetOrderPath: EmptyFunction;
  searchedItemsCount: number;
  setCurrentSearchValue: (text: string) => void;
  setDummyY: TSetDummyY;
  setIsDummyWasRendered: TSetIsDummyWasRendered;
  setIsGarmentLoaded: (isGarmentLoaded: boolean) => void;
  setIsMenuHidden: TSetIsMenuHidden;
  setIsMenuUncovered: TSetIsMenuUncovered;
  setIsMenuUncoveredInitial: TSetIsMenuUncoveredInitial;
  setLang: (lang: string) => void;
  setLoadedInfo: TSetLoadedInfo;
  setSwiperPopupData: (value: {}) => void;
  showLoginForm: boolean;
  showSwiperPopup: boolean;
  swiperPopupData: {};
  toggleIsSearchBarOpened: () => void;
  toggleLoginForm: () => void;
  toggleMobileMenu: () => void;
  toggleSwiperPopup: () => void;
  visitedChoiceItems: string[];
}
