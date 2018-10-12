interface SubgroupChoiceProps {
    lang?: string;
    data?: SubgroupChoiceItem[];
    SubgroupsStore?: any;
    fetchGarments?(): void;
    match: Match;
    path?: string;
    order?: Order;
    defaultValues?: OrderItem;
    setSubgroupTitle?(): void;
    choiceItem?: OrderPathItem,
    popOrderPathitem?(): void;
    backLink?: string;
    userStore?: IUserStore;
}
