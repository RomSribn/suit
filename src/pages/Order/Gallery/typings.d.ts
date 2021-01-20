interface GalleryProps {
    app?: IAppStore;
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
    // orderStore?: IOrderStore;
    orderStore?: any; // tslint:disable-line no-any
    Subgroups?: any; // tslint:disable-line no-any
    SubgroupsStore?: any; // tslint:disable-line no-any
    defaultValues?: OrderItem;

}

interface GalleryContainerProps extends GalleryProps {
    match: Match,
    activeOrderItem?: GalleryStoreItem | null;
}
