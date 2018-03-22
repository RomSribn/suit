interface GroupChoiceProps {
    match: Match;
    choiceItem: OrderPathItem,
    popOrderPathitem(): void;
    backLink: string;
    order: Order;
}