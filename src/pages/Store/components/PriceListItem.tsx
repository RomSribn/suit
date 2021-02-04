import * as React from 'react';
import '../styles/priceListItem.styl';

const PriceListItem = (props: PriceListItemProps) => {
  const { title, description, priceBlock, onClose } = props;
  const { leftInfo, price, currency } = priceBlock;
  return (
    <div className="price-list-item" onClick={onClose}>
      <div className="title-info">
        <span className="title-info__title">{title}</span>
        <span className="title-info__price">
          <span
            style={{
              marginRight: 5,
              color: '#8a8a8a',
            }}
          >
            {leftInfo}
          </span>
          {currency + ' ' + price}
        </span>
      </div>
      <div className="price-list-item__description">
        <span>{description}</span>
      </div>
    </div>
  );
};

export { PriceListItem };
