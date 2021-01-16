interface ChoiceItemsProps {
    items: SubgroupChoiceItem[],
    basicRoute: string;
    orderStore?: IOrderStore;
    lang?: Lang;
    visitedChoiceItems?: string[];
    pushOrderPathItem?(item: OrderPathItem): void;
    addVisitedChoiceItem?(name: string): void;
    removeVisitedChoiceItem?(name: string): void;
    activeGarments?: string[];
}
