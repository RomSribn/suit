import { Subgroups } from '../../../stores/garments';

export interface GroupChoiceProps {
    match: Match;
    choiceItem: OrderPathItem;
    subgroupsStore?: Subgroups;
    popOrderPathitem(): void;
    setSubgroupTitle(nextTitle: string): void;
    backLink: string;
    order: Order;
    lang: string;
    orderStore?: IOrderStore;
}
