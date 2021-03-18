type TIsMenuUncoveredInitial = boolean;
type TSetIsMenuUncoveredInitial = (
  isMenuUncoveredInitial: TIsMenuUncoveredInitial,
) => void;
type TIsMenuUncovered = boolean;
type TSetIsMenuUncovered = (isMenuUncovered: TIsMenuUncovered) => void;
type TDummyY = number;
type TSetDummyY = (y: TDummyY) => void;

interface IAppStore {
  addVisitedChoiceItem: (name: string) => void;
  changeSearchedItemsCount: () => void;
  clearVisitedChoiceItems: () => void;
  currentSearchValue: string;
  cutOrderPath: (value: string) => void;
  dummyY: TDummyY;
  isGarmentLoaded: boolean;
  isMenuUncovered: TIsMenuUncovered;
  isMenuUncoveredInitial: TIsMenuUncoveredInitial;
  isSearchBarOpened: boolean;
  lang: Lang;
  orderPath: OrderPathItem[];
  popOrderPathItem: EmptyFunction;
  pushOrderPathItem: (item: OrderPathItem) => void;
  removeVisitedChoiceItem: (name: string) => void;
  resetOrderPath: EmptyFunction;
  searchedItemsCount: number;
  setCurrentSearchValue: (text: string) => void;
  setDummyY: TSetDummyY;
  setIsGarmentLoaded: (isGarmentLoaded: boolean) => void;
  setIsMenuUncovered: TSetIsMenuUncovered;
  setIsMenuUncoveredInitial: TSetIsMenuUncoveredInitial;
  setLang: (lang: string) => void;
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
