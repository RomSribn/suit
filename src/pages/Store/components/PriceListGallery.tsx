import * as React from 'react';
import { PriceListItem } from './PriceListItem';

const PriceListGallery = ({ priceList }: PriceListGalleryProps) => {
  return (
    <div className="price-list-gallery">
      {priceList.map((priceListItem: priceListItem) => (
        <PriceListItem {...priceListItem} />
      ))}
    </div>
  );
};

export { PriceListGallery };
