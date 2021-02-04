import * as React from 'react';
import { StoreItemTitle } from './StoreItemTitle';
import '../styles/priceListItem.styl';

const PriceListItem = (props: PriceListItemProps) => {
  const {
    title,
    description,
    priceBlock,
    togglePopUp,
    id,
    setSelectedStoreId,
  } = props;
  const onClick = () => {
    setSelectedStoreId(id);
    togglePopUp();
  };
  return (
    <div className="price-list-item" onClick={onClick}>
      <StoreItemTitle title={title} priceBlock={priceBlock} />
      <div className="price-list-item__description">
        <span>{description}</span>
      </div>
    </div>
  );
};

export { PriceListItem };
