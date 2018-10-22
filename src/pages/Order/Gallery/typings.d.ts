interface GalleryProps {
    lang: string;
    items: GalleryStoreItems,
    galleryStore: any;
    filterStore: IFilterStore;
    order: IOrderStore;
    setActiveOrderItem(item: GalleryStoreItem | null): void;
    setPreviewElement(el: ActivePreviewElement | null): void;
    group: string,
    activeElement: GalleryStoreItem | null;
    previewElement: ActivePreviewElement | null;
    match: any;
    orderStore?: IOrderStore;
}

interface GalleryContainerProps extends GalleryProps {
    match: Match,
    isExclusivePopupShowing: () => boolean
}