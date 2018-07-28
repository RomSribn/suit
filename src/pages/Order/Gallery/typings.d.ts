interface GalleryProps {
    lang: string;
    items: GalleryStoreItems,
    galleryStore: any;    
    order: OrderStore;
    setActiveOrderItem(item: GalleryStoreItem): void;
    setPreviewElement(el: ActivePreviewElement | null): void;
    group: string,
}

interface GalleryContainerProps extends GalleryProps {
    match: Match,
}