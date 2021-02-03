type PriceBlock = {
    leftInfo: string;
    price: number;
    currency: string;
}

interface priceListItem {
    title: string;
    description: string;
    priceBlock: PriceBlock;
}

interface PriceListGalleryProps {
    priceList: priceListItem[];
}

interface StoreProps {
}
