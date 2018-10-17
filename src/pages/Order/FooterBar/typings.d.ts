interface FooterBarProps {
    lang?: string;
    orderStore?: IOrderStore;
    popOrderPathitem?(): void;
    backLink?: string;
    mutuallyExclusivePopup?: MutuallyExclusive;
    orderId?: number;
}

type SaveButtonInject = {
    app?: IAppStore,
    orderStore?: IOrderStore;
    subgroupData?: Subgroup;
    Subgroups?: any; // tslint:disable-line no-any

    setMutuallyExclusivePopup?: (callbackFunction: ((params: MutuallyExclusive) => void) |
    {
        show: boolean
    }) => void
    setActiveOrderItem?: (item: GalleryStoreItem | null) => void
}

type SaveButtonSelfProps = {
    saveExistingOrder?: boolean;
    isUpdate?: boolean;
    match?: {
        params: {
            garment: string;
            group: string;
            subgroup: string;
        }
    };
    children?: React.ReactNode
}

type SaveButtonProps = SaveButtonInject & SaveButtonSelfProps