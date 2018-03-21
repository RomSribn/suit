interface SubgroupChoiceProps {
    lang?: string;
    data?: SubgroupChoiceItem[];
    SubgroupsStore?: any;
    fetchGarments?(): void;
    match: Match;
    path?: string;
    order?: Order; 
}
