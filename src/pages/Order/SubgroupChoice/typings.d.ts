interface SubgroupChoiceProps {
    lang?: Lang;
    data?: SubgroupChoiceItem[];
    SubgroupsStore?: any;
    match: Match;
    path?: string;
    order?: Order;
    defaultValues?: OrderItem;
    choiceItem?: OrderPathItem;
    backLink?: string;
    userStore?: IUserStore;
    fetchGarments?(): void;
    setSubgroupTitle?(): void;
    popOrderPathitem?(): void;
}
