interface GalleryProps {
    lang: string;
    items: GalleryStoreItems,
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
}

interface GalleryContainerProps extends GalleryProps {
    match: Match,
    isExclusivePopupShowing: () => boolean;
    activeOrderItem?: GalleryStoreItem | null;
}