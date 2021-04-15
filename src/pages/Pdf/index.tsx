import * as React from 'react';
import { inject, observer } from 'mobx-react';
import * as _ from 'lodash';
import * as moment from 'moment';

import { DemoSection } from '../../components/SectionDemo';
import { parseQuery } from '../../utils/common';
import { Header } from '../../containers/Navigation/component';
import { loc } from './loc';
import './styles.styl';

const InfoRow = ({ name }: InfoRowProps) => (
  <div className="customs customs--short">
    <div className="custom custom--open">
      <span className="custom__content">
        <span className="custom__name">{name}:</span>
      </span>
      <span className="custom__control" />
    </div>
  </div>
);

const Label = ({ name, value }: LabelProps) => (
  <div className="info-block__item">
    {name} {value}
  </div>
);

const InfoSubSection = ({ title, data }: InfoSubSectionProps) => (
  <div className="info-block">
    <div className="info-block__title">{title}</div>
    <div className="info-block__details">
      {data.map((item) => (
        <Label key={item.id} {...item} />
      ))}
    </div>
  </div>
);

@inject(
  ({
    app,
    order,
    routing,
    garments: { GalleryStore, garments, Subgroups },
  }) => ({
    lang: app.lang,
    orderStore: order,
    garmentsStore: garments,
    routingStore: routing,
    fittingStore: new GalleryStore('shirt', 'fitting', 'body_measurements'),
    orderInfo: order.orderInfo || {},
    SubgroupsStore: new Subgroups('shirt'),
  }),
)
@observer
// tslint:disable-next-line
class Pdf extends React.Component<any> {
  componentDidMount() {
    const query = parseQuery(this.props.routingStore.location.search);
    const orderStore = this.props.orderStore;

    if (query.order_id) {
      orderStore.fetchOrder(query.order_id, query['super-user-token']);
    }
  }

  render() {
    const {
      lang,
      orderStore,
      fittingStore,
      SubgroupsStore,
      orderInfo,
    } = this.props;

    const designSubgroup = _.get(SubgroupsStore, `data.design`, []);
    const designSubgroupItems = [...designSubgroup];
    const designItems = _.get(orderStore, `order.shirt[0].design`, {});

    const designBlockData = Object.keys(designItems).map((key) => {
      const itemWithSubsectionCode =
        _.find(designSubgroupItems, { subsection_our_code: key }) || {};
      return {
        name: _.get(itemWithSubsectionCode, `title[${lang}]`, key),
        id: key,
        value: designItems[key].title[lang],
      };
    });

    const fabric = _.get(
      orderStore,
      `order.shirt[0].fabric_ref.fabric.title[${lang}]`,
      null,
    );
    const { customer= '', orderId= '', price= '', date= '', deliveryDays= '' } = orderInfo || {};
    const deliveryDate = moment(date)
      .add(deliveryDays, 'days')
      .format('DD.MM.YYYY');

    const generalInfo = [
      {
        id: 'name',
        name: loc[lang].name,
        value: (customer && customer.name),
      },
      {
        id: 'orderId',
        name: loc[lang].orderId,
        value: orderId,
      },
      {
        id: 'date',
        name: loc[lang].date,
        value: deliveryDate,
      },
      {
        id: 'price',
        name: loc[lang].price,
        value: (price && price.ru) || '',
      },
    ];

    const fittingItems = [...fittingStore.items] || [];
    const fittingsInfo =
      orderStore.order.shirt &&
      fittingItems.reduce((acc: string[], item) => {
        const name = item.title[lang];
        const value = orderStore!.getFitting('shirt')(item.our_code);
        if (name && value) {
          return [...acc, { id: item.id, name, value }];
        }
        return acc;
      }, []);

    return (
      <div className="pdf-page">
        <div className="navbar navbar--white">
          <Header />
        </div>
        {/* tslint:disable-next-line:no-console */}
        <DemoSection onDummyLoad={() => console.log('loaded')} />
        <div className="main main--white">
          <InfoRow name={loc[lang].info} />
          <div className="info-block__wrapper">
            <InfoSubSection data={generalInfo} title={loc[lang].general} />
            {orderStore.order.shirt && fittingsInfo.length > 0 && (
              <InfoSubSection data={fittingsInfo} title={loc[lang].fitting} />
            )}
          </div>

          <InfoRow name={loc[lang].shirt} />
          <div className="info-block__wrapper">
            <InfoSubSection
              title={loc[lang].fabric}
              data={[{ id: 'fabric', name: '', value: fabric }]}
            />
            {designBlockData && (
              <InfoSubSection title={loc[lang].design} data={designBlockData} />
            )}
          </div>
        </div>
      </div>
    );
  }
}

export default Pdf;
