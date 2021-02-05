import * as React from 'react';
// import { Button } from '../../../components/Button';
import { StoreItemTitle } from './StoreItemTitle';
import ReactPlayer from 'react-player';
import '../styles/viewStoreItem.styl';

const ViewStoreItem = ({
  title,
  description,
  priceBlock,
  video,
}: ViewStoreItemProps) => {
  return (
    <div className="view-store-item">
      <ReactPlayer url={video} width="100%" height="50%" controls={true} />

      <StoreItemTitle title={title} priceBlock={priceBlock} />
      <div className="view-store-item__description">
        <span className="pdf-link">
          {`скачать пример pdf заказа для клиента`}
        </span>
        <p>{description}</p>
      </div>
    </div>
  );
};

export { ViewStoreItem };
