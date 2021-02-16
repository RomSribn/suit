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
  setUsersStoreFiles,
  usersStoreItems,
  removeSpecificFileFromItem,
  submitUserStoreItems,
  setTextInputFields,
  storeError,
  setThanksPopUp,
}: PriceListItemDescriptionProps) => {
  const selectedStoreItem =
    priceList.find((priceListItem) => priceListItem.id === id) || priceList[0];
  const onClick = () => {
    const currentItems = usersStoreItems.find((item) => item.id === id);
    submitUserStoreItems();
    if (currentItems) {
      const textInputs = Object.values(currentItems.textInputs);
      const isTextInputsExist =
        textInputs && textInputs.some((input) => !!input);
      const isFileExist = currentItems.files.length;
      setThanksPopUp(!!isTextInputsExist || !!isFileExist);
      setTimeout(() => setThanksPopUp(false), 5000);
    }
  };
  const renderViewStoreItem = () => (
    <>
      <ViewStoreItem
        {...selectedStoreItem[lang]}
        id={id}
        file={selectedStoreItem.file}
        droppMsg={loc[lang].dropMsg}
        video={selectedStoreItem.video}
        isFileInput={selectedStoreItem.isFileInput}
        setUsersStoreFiles={setUsersStoreFiles}
        usersStoreItems={usersStoreItems}
        removeSpecificFileFromItem={removeSpecificFileFromItem}
        setTextInputFields={setTextInputFields}
        storeError={storeError}
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
          <div className="btn close-swiper-popup" onClick={togglePopUp} />
          {renderViewStoreItem()}
        </div>
      </PopUp>
    </div>
  ) : (
    <div className="price-list-item--description">{renderViewStoreItem()}</div>
  );
};

export { PriceListItemDescription };
