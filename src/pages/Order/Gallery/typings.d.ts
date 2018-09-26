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
}

interface GalleryContainerProps extends GalleryProps {
    match: Match,
}