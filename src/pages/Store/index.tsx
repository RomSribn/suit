import * as React from 'react';
import { PanelRow } from '../../components/TableCustomers/PanelRow';
import { PriceListGallery } from './components/PriceListGallery';
import { PriceListItemDescription } from './components/PriceListItemDescription';
import { priceList } from './priceList';
import { observer, inject } from 'mobx-react';
import './index.styl';

@inject(({ customersStore, app }) => ({
  customersStore,
  appStore: app,
}))
@observer
class Store extends React.Component<StoreProps> {
  state = {
    open: false,
  };
  onClose = () => {
    this.setState({
      open: !this.state.open,
    });
  };
  render() {
    const { appStore } = this.props;
    const { open } = this.state;
    const lang = appStore.lang;
    return (
      <div className="main__middle">
        <PanelRow lang={lang} />
        <div className="store-content">
          <PriceListGallery
            priceList={priceList}
            lang={lang}
            onClose={this.onClose}
          />
          <PriceListItemDescription open={open} onClose={this.onClose} />
        </div>
      </div>
    );
  }
}

export { Store };
