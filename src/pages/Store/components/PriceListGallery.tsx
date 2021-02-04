import * as React from 'react';
import { PriceListItem } from './PriceListItem';
import '../styles/priceListGallery.styl';

const PriceListGallery = ({
  priceList,
  lang,
  togglePopUp,
  setSelectedStoreId,
}: PriceListGalleryProps) => {
  return (
    <div className="price-list-gallery">
      {priceList.map((priceListItem: priceListItem) => (
        <PriceListItem
          key={priceListItem.id}
          id={priceListItem.id}
          {...priceListItem[lang]}
          togglePopUp={togglePopUp}
          setSelectedStoreId={setSelectedStoreId}
        />
      ))}
    </div>
  );
};

export { PriceListGallery };
