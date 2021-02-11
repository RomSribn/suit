import * as React from 'react';
import { PanelRow } from '../../components/TableCustomers/PanelRow';
import { PriceListGallery } from './components/PriceListGallery';
import { PriceListItemDescription } from './components/PriceListItemDescription';
import { priceList } from './priceList';
import { observer, inject } from 'mobx-react';
import { isStorePageVisitedId } from '../../utils/variables';
import './index.styl';

@inject(
  ({
    customersStore: {
      setSelectedStoreId,
      selectedStoreId,
      setUsersStoreFiles,
      usersStoreItems,
      removeSpecificFileFromItem,
      submitUserStoreItems,
      setTextInputFields,
      storeError,
      anonUserInfo,
      setAnonUserInfo,
    },
    app: { lang },
    user: { isAuth },
  }) => ({
    selectedStoreId,
    setSelectedStoreId,
    setUsersStoreFiles,
    usersStoreItems,
    removeSpecificFileFromItem,
    submitUserStoreItems,
    setTextInputFields,
    storeError,
    lang,
    isAuth,
    anonUserInfo,
    setAnonUserInfo,
  }),
)
@observer
class Store extends React.Component<StoreProps> {
  state = {
    open: false,
  };
  togglePopUp = () => {
    this.setState({
      open: !this.state.open,
    });
  };

  componentDidMount = () => {
    const isStorePageVisitedValue = { value: true };
    localStorage.setItem(
      isStorePageVisitedId,
      JSON.stringify(isStorePageVisitedValue),
    );
  };

  render() {
    const {
      lang,
      setSelectedStoreId,
      selectedStoreId,
      setUsersStoreFiles,
      usersStoreItems,
      removeSpecificFileFromItem,
      submitUserStoreItems,
      setTextInputFields,
      storeError,
      isAuth,
      anonUserInfo,
      setAnonUserInfo,
    } = this.props;
    const { open } = this.state;
    return (
      <div className="main__middle">
        <PanelRow lang={lang} />
        <div className="store-content">
          <PriceListGallery
            priceList={priceList}
            lang={lang}
            selectedStoreId={selectedStoreId}
            setSelectedStoreId={setSelectedStoreId}
            togglePopUp={this.togglePopUp}
          />
          <PriceListItemDescription
            lang={lang}
            open={open}
            togglePopUp={this.togglePopUp}
            selectedStoreId={selectedStoreId}
            setUsersStoreFiles={setUsersStoreFiles}
            usersStoreItems={usersStoreItems}
            removeSpecificFileFromItem={removeSpecificFileFromItem}
            submitUserStoreItems={submitUserStoreItems!}
            setTextInputFields={setTextInputFields!}
            storeError={storeError!}
            isAuth={isAuth}
            anonUserInfo={anonUserInfo}
            setAnonUserInfo={setAnonUserInfo}
          />
        </div>
      </div>
    );
  }
}

export { Store };
