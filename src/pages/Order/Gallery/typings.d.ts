interface GalleryProps {
    lang: string;
    items: GalleryStoreItems,
    // TODO: сделать нормальную типизацию для галлереи
    galleryStore: any;
    filterStore: IFilterStore;
    setActiveOrderItem(item: GalleryStoreItem | null): void;
    setPreviewElement(el: ActivePreviewElement | null): void;
    group: string,
    activeElement: GalleryStoreItem | null;
    previewElement: ActivePreviewElement | null;
    activeOrderItem?: GalleryStoreItem | null;
    match: any;
    orderStore?: IOrderStore;
    Subgroups?: any; // tslint:disable-line no-any
}

interface GalleryContainerProps extends GalleryProps {
    match: Match,
    isExclusivePopupShowing: () => boolean;
    activeOrderItem?: GalleryStoreItem | null;
}
