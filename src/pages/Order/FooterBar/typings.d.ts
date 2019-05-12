import { Subgroups } from '../../../stores/garments';

export interface FooterBarProps {
    lang?: Lang;
    orderStore?: IOrderStore;
    popOrderPathitem?(): void;
    subgroupsStore?: Subgroups;
    backLink?: string;
    mutuallyExclusivePopup?: MutuallyExclusive;
    orderId?: number;
    routing?: any; // tslint:disable-line no-any
    setActiveItem?(item: GalleryStoreItem | null): void;
}

export type SaveButtonInject = {
    app?: IAppStore,
    orderStore?: IOrderStore;
    subgroupData?: Subgroup;
    Subgroups?: any; // tslint:disable-line no-any

    setMutuallyExclusivePopup?: (callbackFunction: ((params: MutuallyExclusive) => void) |
    {
        show: boolean
    }) => void
    setActiveOrderItem?: (item: GalleryStoreItem | null) => void
};

export type SaveButtonSelfProps = {
    saveExistingOrder?: boolean;
    isUpdate?: boolean;
    match?: {
        params: {
            garment: string;
            group: string;
            subgroup: string;
        }
    };
    children?: React.ReactNode;
    saveCallback?: Function;
    lang?: string;
    link?: string;
};

export type SaveButtonProps = SaveButtonInject & SaveButtonSelfProps;