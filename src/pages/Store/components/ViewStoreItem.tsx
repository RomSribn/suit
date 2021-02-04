import * as React from 'react';
import { StoreItemTitle } from './StoreItemTitle';
import '../styles/viewStoreItem.styl';

const ViewStoreItem = ({
  title,
  description,
  priceBlock,
}: ViewStoreItemProps) => {
  return (
    <div className="view-store-item">
      <StoreItemTitle title={title} priceBlock={priceBlock} />
      <p className="view-store-item__description">{description}</p>
    </div>
  );
};

export { ViewStoreItem };
