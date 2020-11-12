import { Subgroups } from '../../../stores/garments';

export interface GroupChoiceProps {
    app?: IAppStore;
    filterStore?: IFilterStore;
    match: Match;
    choiceItem: OrderPathItem;
    subgroupsStore?: Subgroups;
    popOrderPathitem(): void;
    setSubgroupTitle(nextTitle: string): void;
    backLink: string;
    order: Order;
    lang: string;
    garments?: {
        Subgroups: typeof Subgroups
    };
    orderStore?: IOrderStore;
}
