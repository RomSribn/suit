import * as React from 'react';
import { inject, observer } from 'mobx-react';
import * as _ from 'lodash';
import cn from 'classnames';
import * as moment from 'moment';

import { DemoSection } from '../../components/SectionDemo';
import { parseQuery } from '../../utils/common';
import { Fitting } from '../Order/Fitting/component';
import { SubgroupChoice } from '../../pages/Order/SubgroupChoice/component';
import { Header } from '../../containers/Navigation/component';
import { API_ROOT } from '../../config/routes';
import { loc } from './loc';
import './styles.styl';

const InfoRow = ({name, data, open, subitem}: InfoRowProps) => {
    return (
        <div className="customs customs--short">
            <div className={cn({'custom': true, 'custom--open': open, 'customs--subitem': subitem})}>
                <span className="custom__content">
                    <span className="custom__name">{name}: </span>
                    <span className="custom__status">{data}</span>
                </span>
                {!subitem && <span className="custom__control"/>}
            </div>
        </div>
    );
};

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
                        orderStore.fetchOrder(query.order_id, query.sutoken);
                    });
            }
        }
    }

    render() {
        const { lang, orderStore, fittingStore, SubgroupsStore, orderInfo, order } = this.props;
        const designSubgroup = _.get(SubgroupsStore, `data.design`, []);
        const designSubgroupItems = [...designSubgroup];
        const fittingItems = [...fittingStore.items] || [];
        const designItems = _.get(orderStore, `order.shirt[0].design`, {});

        const subgroupChoiceData = Object.keys(designItems).map((key) => {
            const itemWithSubsectionCode = _.find(designSubgroupItems, { 'subsection_our_code': key }) || {};
            return {
                link: `design/${key}`,
                linkName: _.get(itemWithSubsectionCode, `title[${lang}]`, ''),
                id: key,
                ourCode: designItems[key].our_code,
                isSubclear: false,
                isInput: false,
                status: designItems[key].title[lang]
            };
        }
        );

        const hiddenItems = ['initials_style', 'initials_color', 'buttonholes_color'];
        const imgUrls = Object.keys(designItems).reduce((acc: string[], item: string) => {
            if (hiddenItems.includes(item) || !designItems[item].img_url_2d) {
                return acc;
            }
            const imgUrl2d = designItems[item].img_url_2d.replace('/html', '');
            return [...acc, API_ROOT + imgUrl2d];
        }, []);

        const fabric = _.get(orderStore, `order.shirt[0].fabric_ref.fabric.title[${lang}]`, null);
        const {customer, orderId, price, date, deliveryDays} = orderInfo;
        const deliveryDate = moment(date).add(deliveryDays, 'days').format('DD.MM.YYYY');

        return (
            <div className="pdf-page">
                <Header/>
                <div className="demo">
                    <DemoSection onDummyLoad={() => console.log('loaded')} /> {/* tslint:disable-line:no-console */}
                </div>
                <div className="main main--white">
                    <InfoRow name={loc[lang].general} open={true} />
                    {customer && (
                        <>
                            <InfoRow name={loc[lang].name} data={customer.name} subitem={true} />
                            <InfoRow name={loc[lang].phone} data={customer.phone} subitem={true} />
                            <InfoRow name={loc[lang].email} data={customer.email} subitem={true} />
                            <InfoRow name={loc[lang].orderId} data={orderId} subitem={true} />
                            <InfoRow name={loc[lang].date} data={deliveryDate} subitem={true} />
                            <InfoRow name={loc[lang].price} data={price.ru} subitem={true} />
                        </>
                    )}
                    {fabric && <InfoRow name={loc[lang].fabric} data={fabric} />}
                    {subgroupChoiceData && (
                        <div style={{width: '100%'}}>
                            <SubgroupChoice
                                lang={lang}
                                data={subgroupChoiceData}
                                match={{params: {}, isExact: true, path: '', url: ''}}
                            />
                        </div>
                    )}

                    {imgUrls && (
                        <div className="gallery__bar-cont">
                            {imgUrls.map(url => (
                                <div key={url} className="gallery__item-blc">
                                    <div className="gallery__item">
                                        <img src={url} alt="pic"/>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}

                    {order.shirt && (
                        <>
                            <InfoRow name={loc[lang].fitting} open={true} />
                            <Fitting
                                lang={lang}
                                items={fittingItems}
                                orderStore={orderStore}
                            />
                        </>
                    )}
                </div>
            </div>
        );
    }
}

export default Pdf;