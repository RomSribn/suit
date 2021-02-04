import * as React from 'react';
import { PopUp } from '../../../containers/Popup';
import { isMobile } from '../../../utils';
import '../styles/priceListItemDescription.styl';

const PriceListItemDescription = ({
  open,
  onClose,
}: PriceListItemDescriptionProps) => {
  return isMobile() ? (
    <div className="wrapper">
      <PopUp open={open} onClose={onClose}>
        <div className="price-list-item--description">
          <div className="close-popup" onClick={onClose}>
            X
          </div>
        </div>
      </PopUp>
    </div>
  ) : (
    <div className="price-list-item--description">2</div>
  );
};

export { PriceListItemDescription };
