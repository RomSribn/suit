interface GroupChoiceProps {
    match: Match;
    choiceItem: OrderPathItem,
    popOrderPathitem(): void;
    setSubgroupTitle(nextTitle: string): void;
    backLink: string;
    order: Order;
    lang: string;
}