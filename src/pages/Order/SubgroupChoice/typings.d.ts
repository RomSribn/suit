interface SubgroupChoiceProps {
    lang?: Lang;
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
