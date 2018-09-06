interface FittingProps {
    lang: string;
    items: GalleryStoreItems,
    orderStore?: IOrderStore;
    garmentInfo?: {
        garment: string;
        group: string;
        subgroup: string;
    }
}

interface FittingContainerProps extends FittingProps {
    match: Match,
    galleryStore?: any;
}
