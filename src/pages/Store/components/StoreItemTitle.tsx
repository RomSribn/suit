import * as React from 'react';
import '../styles/storeItemTitle.styl';

const StoreItemTitle = ({ title, priceBlock }: StoreItemTitleProps) => {
  const { leftInfo, price, currency } = priceBlock;
  const priceStringify = price.toString();
  const parsedPrice =
    priceStringify.length >= 6
      ? `${priceStringify.slice(0, 3)} ${priceStringify.slice(3)}`
      : priceStringify;
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
        {currency + ' ' + parsedPrice}
      </span>
    </div>
  );
};

export { StoreItemTitle };
