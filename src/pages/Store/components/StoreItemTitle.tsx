import * as React from 'react';
import '../styles/storeItemTitle.styl';

const StoreItemTitle = ({ title, priceBlock }: StoreItemTitleProps) => {
  const { leftInfo, price, currency } = priceBlock;
  return (
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
  );
};

export { StoreItemTitle };
