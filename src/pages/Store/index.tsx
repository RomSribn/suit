import * as React from 'react';
import { PanelRow } from '../../components/TableCustomers/PanelRow';
import { PriceListGallery } from './components/PriceListGallery';
import { PriceListItemDescription } from './components/PriceListItemDescription';
import { priceList } from './priceList';
import { observer, inject } from 'mobx-react';

@inject(({ customersStore, app }) => ({
  customersStore,
  appStore: app,
}))
@observer
class Store extends React.Component<StoreProps> {
  constructor(props: StoreProps) {
    super(props);
  }
  render() {
    return (
      <div className="main__middle">
        <PanelRow lang={`ru`} />
        <div className="store-content">
          <PriceListGallery priceList={priceList} />
          <PriceListItemDescription />
        </div>
      </div>
    );
  }
}

export { Store };
