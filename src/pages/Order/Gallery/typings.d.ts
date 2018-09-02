interface GalleryProps {
    lang: string;
    items: GalleryStoreItems,
    galleryStore: any;
    filterStore: any;
    order: IOrderStore;
    setActiveOrderItem(item: GalleryStoreItem | null): void;
    setPreviewElement(el: ActivePreviewElement | null): void;
    group: string,
}

interface GalleryContainerProps extends GalleryProps {
    match: Match,
}