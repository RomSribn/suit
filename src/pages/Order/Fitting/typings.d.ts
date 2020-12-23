interface IDataFitting {
    defaultCode?: string;
    id: string;
    isInput?: string;
    isSubclear?: string;
    link: string;
    linkName: string;
    ourCode?: string;
    status: string;
    subgroupTitle: {};
}

interface FittingProps {
    lang: string;
    items: GalleryStoreItems,
    orderStore?: IOrderStore;
    garmentInfo?: {
        garment: string;
        group: string;
        subgroup: string;
    };
    // dataFitting?: SubgroupChoiceItem[]; 
    dataFitting?: any[]; 
    url?: string;
    garment?: string;
}

interface FittingContainerProps extends FittingProps {
    match: Match,
    galleryStore?: any;
}
