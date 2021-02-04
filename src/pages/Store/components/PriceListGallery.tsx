import * as React from 'react';
import { PriceListItem } from './PriceListItem';
import '../styles/priceListGallery.styl';

const PriceListGallery = ({
  priceList,
  lang,
  onClose,
}: PriceListGalleryProps) => {
  return (
    <div className="price-list-gallery">
      {priceList.map((priceListItem: priceListItem) => (
        <PriceListItem {...priceListItem[lang]} onClose={onClose} />
      ))}
    </div>
  );
};

export { PriceListGallery };
