interface FittingProps {
    lang: string;
    items: GalleryStoreItems,
}

interface FittingContainerProps extends FittingProps {
    match: Match,
    galleryStore?: any;
}
