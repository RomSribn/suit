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

declare interface IMenuCoverButtonProps {
  setIsMenuUncovered: TSetIsMenuUncovered;
  isMenuUncovered: TIsMenuUncovered;
  onTouchStart: (event: React.TouchEvent<HTMLInputElement>) => void;
  initialTouch: number;
}

declare interface TRouteProps {
  match: Match;
}
