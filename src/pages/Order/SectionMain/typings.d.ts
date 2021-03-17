interface MainSectionProps extends OrderSectionInterface {
  isIndexPage: boolean;
  detailsDeep: boolean;
  afterGarmentChoice: boolean;
  dummyY?: number;
  isMenuUncovered?: boolean;
  setIsMenuUncovered?: (isMenuUncovered: boolean) => void;
  currentActiveGarment?: string;
  lang?: string;
  dummyWasRendered: boolean;
}

declare interface TRouteProps {
  match: Match;
}
