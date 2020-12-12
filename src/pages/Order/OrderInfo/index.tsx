import * as React from 'react';
import { inject, observer } from 'mobx-react';
import * as moment from 'moment';
import * as Component from './component';

import { isMobile } from '../../../utils';

import './styles.styl';

@inject(({app, order}, nextProps) => ({
    lang: app.lang,
    order,
    ...(nextProps as object),
}))
@observer
class OrderInfo extends React.Component<COrderInfoProps> {
    render() {
        const {
            lang,
            order
        } = this.props;
        const orderInfo = order!.orderInfo;
        const deliveryDate = orderInfo ?
            moment().add(orderInfo.deliveryDays, 'days').format('DD.MM.YYYY') :
            '00.00.0000';
        const price = orderInfo ? orderInfo.price[lang!] : '0';
        return (
            <React.Fragment>
            {
                !isMobile() &&
                <Component.OrderInfo
                    lang={lang!}
                    deliveryDate={deliveryDate}
                    price={price}
                /> 
            }
            </React.Fragment>
            
        );
    }
}

export {
    OrderInfo,
};