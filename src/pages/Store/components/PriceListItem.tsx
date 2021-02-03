import * as React from 'react';

const PriceListItem = (props: priceListItem) => {
  const { title, description, priceBlock } = props;
  const { leftInfo, price } = priceBlock;
  return (
    <div className="price-list-item">
      <span>{title}</span>
      <span>{description}</span>
      <span>{leftInfo + price}</span>
    </div>
  );
};

export { PriceListItem };
