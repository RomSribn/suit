import * as React from 'react';
import { StoreItemTitle } from './StoreItemTitle';
import * as classNames from 'classnames';
import '../styles/priceListItem.styl';

const PriceListItem = ({
  title,
  description,
  priceBlock,
  togglePopUp,
  id,
  selectedStoreId,
  setSelectedStoreId,
}: PriceListItemProps) => {
  const onClick = () => {
    setSelectedStoreId(id);
    togglePopUp();
  };

  return (
    <div
      className={classNames('price-list-item', {
        _active: id === selectedStoreId,
      })}
      onClick={onClick}
    >
      <StoreItemTitle title={title} priceBlock={priceBlock} />
      <div className="price-list-item__description">
        <span>{description}</span>
      </div>
    </div>
  );
};

export { PriceListItem };
