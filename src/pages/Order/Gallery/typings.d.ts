interface GalleryProps {
    lang: string;
    items: GalleryStoreItems,
}

interface GalleryContainerProps extends GalleryProps {
    match: Match,
    galleryStore?: any;
}