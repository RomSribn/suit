import * as React from 'react';
import { loc } from './loc';

class OrderInfo extends React.PureComponent<OrderInfoProps> {
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
            <div className="calc-blc">
                <div className="calc-blc__col calc-blc__col--summ">
                    <div className="calc-blc__col-name">{loc[lang!].price}:</div>
                    <div className="calc-blc__col-val">
                        <div
                            className={
                                'calc-blc__col-val__curr' +
                                (lang === 'en' ? ' calc-blc__col-val__curr_euro' : '')
                            }
                        >
                            {lang !== 'en' ? loc[lang!].currency : ''}
                        </div>
                        {price}
                    </div>
                </div>
                <div className="calc-blc__slash">&nbsp;/&nbsp;</div>
                <div className="calc-blc__col calc-blc__col--date">
                    <div className="calc-blc__col-name">{loc[lang!].delivery}:</div>
                    <div
                        style={{textAlign: 'center'}}
                        className="calc-blc__col-val"
                    >{deliveryDate}
                    </div>
                </div>
            </div>
        );
    }
}

export {
    OrderInfo,
};