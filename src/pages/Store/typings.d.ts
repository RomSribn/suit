type TPriceBlock = {
    leftInfo: string;
    price: number;
    currency: string;
}

interface PriceListItemLocale {
    title: string;
    description: string;
    priceBlock: TPriceBlock;
}

interface priceListItem {
    id: number;
    video: string;
    ru: PriceListItemLocale;
    en: PriceListItemLocale;
}

interface PriceListGalleryProps {
    priceList: priceListItem[];
    lang: Lang;
    togglePopUp: () => void;
    selectedStoreId: TSelectedStoreId;
    setSelectedStoreId: TSetSelectedStoreId;
}

interface PriceListItemProps extends PriceListItemLocale {
    id: number;
    togglePopUp: () => void;
    selectedStoreId: TSelectedStoreId;
    setSelectedStoreId: TSetSelectedStoreId;
}

interface PriceListItemDescriptionProps {
    lang: Lang;
    open: boolean;
    togglePopUp: () => void;
    selectedStoreId: TSelectedStoreId;
}

interface ViewStoreItemProps extends PriceListItemLocale {
    video: string;
}

interface StoreItemTitleProps {
    title: string;
    priceBlock: TPriceBlock;
}

interface StoreProps {
    selectedStoreId: TSelectedStoreId;
    setSelectedStoreId: TSetSelectedStoreId;
    lang: Lang;
}
