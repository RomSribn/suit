interface ChoiceItemsProps {
    items: SubgroupChoiceItem[],
    basicRoute: string;
    pushOrderPathItem?(item: OrderPathItem): void;
    orderStore?: IOrderStore;
    lang?: string;
}
