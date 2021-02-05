import * as React from 'react';
import { PopUp } from '../../../containers/Popup';
import { isMobile } from '../../../utils';
import { priceList } from '../priceList';
import { ViewStoreItem } from './ViewStoreItem';
import { Button } from '../../../components/Button';
import '../styles/priceListItemDescription.styl';

const PriceListItemDescription = ({
  lang,
  open,
  togglePopUp,
  selectedStoreId: id = 1,
}: PriceListItemDescriptionProps) => {
  const selectedStoreItem =
    priceList.find((priceListItem) => priceListItem.id === id) || priceList[0];
  const onClick = () => {
    return lang;
  };
  return isMobile() ? (
    <div className="wrapper">
      <PopUp open={open} onClose={togglePopUp}>
        <div className="price-list-item--description">
          <div className="close-popup" onClick={togglePopUp}>
            X
          </div>
          <ViewStoreItem
            {...selectedStoreItem[lang]}
            video={selectedStoreItem.video}
          />
          <Button theme={'black'} onClick={onClick} className="approve-button">
            <span>Запросить стоимость</span>
          </Button>
        </div>
      </PopUp>
    </div>
  ) : (
    <div className="price-list-item--description">
      <ViewStoreItem
        {...selectedStoreItem[lang]}
        video={selectedStoreItem.video}
      />
      <Button theme={'black'} onClick={onClick} className="approve-button">
        <span>Запросить стоимость</span>
      </Button>
    </div>
  );
};

export { PriceListItemDescription };
