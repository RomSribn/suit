import { Subgroups } from '../../../stores/garments';

export interface GroupChoiceProps {
  app?: IAppStore;
  filterStore?: IFilterStore;
  withToggle: boolean;
  match: Match;
  choiceItem: OrderPathItem;
  subgroupsStore?: Subgroups;
  popOrderPathitem(): void;
  setSubgroupTitle(nextTitle: string): void;
  backLink: string;
  order: Order;
  lang: string;
  userStore?: IUserStore;
  activeGarments?: string[];
  garments?: {
    Subgroups: typeof Subgroups;
    garments: Garments;
  };
  orderStore?: IOrderStore;
}
