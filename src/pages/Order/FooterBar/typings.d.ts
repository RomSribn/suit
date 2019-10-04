import { Subgroups } from '../../../stores/garments';

export interface FooterBarProps {
    lang?: Lang;
    isAuth?: boolean;
    orderStore?: IOrderStore;
    subgroupsStore?: Subgroups;
    backLink?: string;
    mutuallyExclusivePopup?: MutuallyExclusive;
    orderId?: number;
    routing?: any; // tslint:disable-line no-any
    Subgroups?: any; // tslint:disable-line no-any
    popOrderPathitem?(): void;
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
    className?: string;
    saveCallback?: Function;
    lang?: string;
    link?: string;
};

export type SaveButtonProps = SaveButtonInject & SaveButtonSelfProps;