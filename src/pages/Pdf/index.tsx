import * as React from 'react';
import { inject, observer } from 'mobx-react';
import * as _ from 'lodash';
import * as moment from 'moment';

import { DemoSection } from '../../components/SectionDemo';
import { parseQuery } from '../../utils/common';
import { Header } from '../../containers/Navigation/component';
import { loc } from './loc';
import './styles.styl';

const InfoRow = ({name}: InfoRowProps) => (
    <div className="customs customs--short">
        <div className="custom custom--open">
            <span className="custom__content">
                <span className="custom__name">{name}:</span>
            </span>
            <span className="custom__control"/>
        </div>
    </div>
);

const Label = ({name, value}: LabelProps) => <div className="info-block__item">{name} {value}</div>;

const InfoSubSection = ({title, data}: InfoSubSectionProps) => (
    <div className="info-block">
        <div className="info-block__title">{title}</div>
        <div className="info-block__details">
            {data.map((item) => <Label key={name} name={item.name} value={item.value}/>)}
        </div>
    </div>
);

@inject(({ app, order, routing,  garments: { GalleryStore, garments, Subgroups } }) => ({
    lang: app.lang,
    orderStore: order,
    garmentsStore: garments,
    routingStore: routing,
    fittingStore: new GalleryStore('shirt', 'fitting', 'fitting'),
    orderInfo: order.orderInfo || {},
    SubgroupsStore: new Subgroups('shirt')
}))
@observer
class Pdf extends React.Component<any>{ //tslint:disable-line
    componentDidMount() {
        const query = parseQuery(this.props.routingStore.location.search);
        const orderStore = this.props.orderStore;
        const garmentsStore = this.props.garmentsStore;

        if (orderStore.isEmptyOrder()) {
            if (query.order_id) {
                orderStore.fetchInitialOrder(
                    Object.keys(garmentsStore.garmentsList),
                    // tslint:disable-next-line:no-any
                    (garments: any) => garmentsStore.setChosenGarments(garments)
                )
                    .then(() => {
                        orderStore.fetchOrder(query.order_id, query['super-user-token']);
                    });
            }
        }
    }

    render() {
        const { lang, orderStore, fittingStore, SubgroupsStore, orderInfo, order } = this.props;
        if (!orderInfo.orderId) {
            return null;
        }

        const designSubgroup = _.get(SubgroupsStore, `data.design`, []);
        const designSubgroupItems = [...designSubgroup];
        const designItems = _.get(orderStore, `order.shirt[0].design`, {});

        const designBlockData = Object.keys(designItems).map((key) => {
            const itemWithSubsectionCode = _.find(designSubgroupItems, { 'subsection_our_code': key }) || {};
            return {
                name: _.get(itemWithSubsectionCode, `title[${lang}]`, ''),
                id: key,
                value: designItems[key].title[lang],
            };
        });

        const fabric = _.get(orderStore, `order.shirt[0].fabric_ref.fabric.title[${lang}]`, null);
        const {customer, orderId, price, date, deliveryDays} = orderInfo;
        const deliveryDate = moment(date).add(deliveryDays, 'days').format('DD.MM.YYYY');

        const generalInfo = [{
            name: loc[lang].name,
            value: customer && customer.name || '',
        }, {
            name: loc[lang].orderId,
            value: orderId || '',
        }, {
            name: loc[lang].date,
            value: deliveryDate || '',
        }, {
            name: loc[lang].price || '',
            value: price && price.ru || '',
        }];

        const fittingItems = [...fittingStore.items] || [];
        const fittingsInfo = order.shirt && orderStore && fittingItems.reduce((acc: string[], item) => {
            const name = item.title[lang];
            const value = orderStore!.getFitting('shirt')(item.our_code);
            if (name && value) {
                return [...acc, { name, value }];
            }
            return acc;
        }, []);

        return (
            <div className="pdf-page">
                <div className="navbar navbar--white">
                    <Header/>
                </div>
                <DemoSection onDummyLoad={() => console.log('loaded')}/> {/* tslint:disable-line:no-console */}
                <div className="main main--white">
                    <InfoRow name={loc[lang].info}/>
                    <div className="info-block__wrapper">
                        <InfoSubSection data={generalInfo} title={loc[lang].general}/>
                        {order.shirt && orderStore && fittingsInfo.length > 0 && (
                            <InfoSubSection data={fittingsInfo} title={loc[lang].fitting}/>
                        )}
                    </div>

                    <InfoRow name={loc[lang].shirt}/>
                    <div className="info-block__wrapper">
                        <InfoSubSection title={loc[lang].fabric} data={[{name: '', value: fabric}]}/>
                        {designBlockData && <InfoSubSection title={loc[lang].design} data={designBlockData}/>}
                    </div>
                </div>
            </div>
        );
    }
}

export default Pdf;