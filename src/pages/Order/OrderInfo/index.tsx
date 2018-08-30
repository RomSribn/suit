import * as React from 'react';
import { inject, observer } from 'mobx-react';
import * as moment from 'moment';
import { OrderInfo as Component } from './component';

@inject(({app, order}, nextProps) => ({
    lang: app.lang,
    order,
    ...nextProps,
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
            '--';
        const price = orderInfo ? orderInfo.price[lang!] : '0';
        return (
            <Component
                lang={lang!}
                deliveryDate={deliveryDate}
                price={price}
            />
        );
    }
}

export {
    OrderInfo,
};