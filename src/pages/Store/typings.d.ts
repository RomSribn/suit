type PriceBlock = {
    leftInfo: string;
    price: number;
    currency: string;
}

interface priceListItemLocale {
    title: string;
    description: string;
    priceBlock: PriceBlock;
}

interface priceListItem {
    ru: priceListItemLocale;
    en: priceListItemLocale;
}

interface PriceListGalleryProps {
    priceList: priceListItem[];
    lang: Lang;
    onClose: () => void;
}

interface PriceListItemProps extends priceListItemLocale {
    onClose: () => void;
}

interface PriceListItemDescriptionProps {
    open: boolean;
    onClose: () => void;
}

interface StoreProps {
    appStore: IAppStore;
}
