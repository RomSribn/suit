import * as React from 'react';
import { PanelRow } from '../../components/TableCustomers/PanelRow';
import { PriceListGallery } from './components/PriceListGallery';
import { PriceListItemDescription } from './components/PriceListItemDescription';
import { priceList } from './priceList';
import { observer, inject } from 'mobx-react';
import './index.styl';

@inject(
  ({
    customersStore: {
      setSelectedStoreId,
      selectedStoreId,
      setUsersStoreItems,
      usersStoreItems,
      removeSpecificFileFromItem,
      submitUserStoreItems,
    },
    app: { lang },
  }) => ({
    selectedStoreId,
    setSelectedStoreId,
    setUsersStoreItems,
    usersStoreItems,
    removeSpecificFileFromItem,
    submitUserStoreItems,
    lang,
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

  render() {
    const {
      lang,
      setSelectedStoreId,
      selectedStoreId,
      setUsersStoreItems,
      usersStoreItems,
      removeSpecificFileFromItem,
      submitUserStoreItems,
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
            setUsersStoreItems={setUsersStoreItems}
            usersStoreItems={usersStoreItems}
            removeSpecificFileFromItem={removeSpecificFileFromItem}
            submitUserStoreItems={submitUserStoreItems!}
          />
        </div>
      </div>
    );
  }
}

export { Store };
