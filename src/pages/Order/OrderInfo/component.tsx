import * as React from 'react';
import { loc } from './loc';

import { isMobile, isLandscape, isTablet, isIpadPro } from '../../../utils';

class OrderInfo extends React.PureComponent<OrderInfoProps> {
    static defaultProps: OrderInfoProps = {
        lang: 'en',
        deliveryDate: '00.00.0000',
        price: ''
    };

    componentWillMount() {
        if (isMobile() || isTablet() || isIpadPro()) {
            // window.addEventListener('orientationchange', () => {
            //     setTimeout(() => {
            //         this.forceUpdate();
            //     }, 200);
            // }, false);
          }
    }

    render() {
        const {
            lang,
            deliveryDate,
            price
        } = this.props;
        const fullDeliveryDate = isTablet() && !isLandscape()
            ? deliveryDate.split('.').slice(0, deliveryDate.split('.').length - 1).join('/')
            : deliveryDate;
        return (
            <div className="calc-blc">
                <div className="calc-blc__col calc-blc__col--summ">
                    <div className="calc-blc__col-name">{loc[lang!].price}:</div>
                    <div className="calc-blc__col-val">
                        <div className="calc-blc__col-val__curr">
                            {loc[lang!].currency}
                        </div>
                        {price}
                    </div>
                </div>
                <div className="calc-blc__slash">&nbsp;/&nbsp;</div>
                <div className="calc-blc__col calc-blc__col--date">
                    <div className="calc-blc__col-name">{loc[lang!].delivery}:</div>
                    <div
                        style={{textAlign: 'center'}}
                        className="calc-blc__col-val calc-blc__col-val-delivery"
                    >{fullDeliveryDate}
                    </div>
                </div>
            </div>
        );
    }
}

class OrderInfoMobile extends React.PureComponent<OrderInfoProps> {
    static defaultProps: OrderInfoProps = {
        lang: 'en',
        deliveryDate: '00.00.0000',
        price: ''
    };
    render() {
        const {
            lang,
            deliveryDate,
            price
        } = this.props;
        return (
            <div className="calc-blc-mobile">
                <span className="calc-text-mobile">
                    <span>{`${loc[lang].price}: ${loc[lang].currency}${price}`}</span>
                    <span className="portrait-hide">&nbsp;/&nbsp; {`${loc[lang].delivery} ${deliveryDate}`}</span>
                </span>
            </div>
        );
    }
}

export {
    OrderInfo,
    OrderInfoMobile
};
