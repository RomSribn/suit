import * as React from 'react';
import { PopUp } from '../../../containers/Popup';
import { isMobile } from '../../../utils';
import { priceList } from '../priceList';
import { ViewStoreItem } from './ViewStoreItem';
import { Button } from '../../../components/Button';
import { loc } from '../loc';
import '../styles/priceListItemDescription.styl';

const PriceListItemDescription = ({
  lang,
  open,
  togglePopUp,
  selectedStoreId: id = 1,
  setUsersStoreItems,
  usersStoreItems,
  removeSpecificFileFromItem,
  submitUserStoreItems,
}: PriceListItemDescriptionProps) => {
  const selectedStoreItem =
    priceList.find((priceListItem) => priceListItem.id === id) || priceList[0];
  const onClick = () => {
    submitUserStoreItems();
  };
  const renderViewStoreItem = () => (
    <>
      <ViewStoreItem
        {...selectedStoreItem[lang]}
        id={id}
        droppMsg={loc[lang].dropMsg}
        video={selectedStoreItem.video}
        isFileInput={selectedStoreItem.isFileInput}
        setUsersStoreItems={setUsersStoreItems}
        usersStoreItems={usersStoreItems}
        removeSpecificFileFromItem={removeSpecificFileFromItem}
      />
      <Button theme={'black'} onClick={onClick} className="approve-button">
        <span>{loc[lang].submitBtn}</span>
      </Button>
    </>
  );
  return isMobile() ? (
    <div className="wrapper">
      <PopUp open={open} onClose={togglePopUp}>
        <div className="price-list-item--description">
          <div className="close-popup" onClick={togglePopUp}>
            X
          </div>
          {renderViewStoreItem()}
        </div>
      </PopUp>
    </div>
  ) : (
    <div className="price-list-item--description">{renderViewStoreItem()}</div>
  );
};

export { PriceListItemDescription };
