interface MainSectionProps extends OrderSectionInterface {
  isIndexPage: boolean;
  detailsDeep: boolean;
  afterGarmentChoice: boolean;
  dummyY?: TDummyY;
  isMenuUncovered?: TIsMenuUncovered;
  setIsMenuUncovered?: TSetIsMenuUncovered;
  isMenuUncoveredInitial?: TIsMenuUncoveredInitial;
  setIsMenuUncoveredInitial?: TSetIsMenuUncoveredInitial;
  currentActiveGarment?: string;
  lang?: string;
  dummyWasRendered: boolean;
  orderPath?: OrderPathItem[];
  route?: string;
}

declare interface TRouteProps {
  match: Match;
}
