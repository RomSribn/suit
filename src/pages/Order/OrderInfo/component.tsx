import * as React from 'react';
import { loc } from './loc';

class OrderInfo extends React.PureComponent<OrderInfoProps> {
    static defaultProps = {
        lang: 'en',
    };
    render() {
        const {
            lang,
        } = this.props;
        return (
            <div className="calc-blc">
                <div className="calc-blc__col calc-blc__col--summ">
                    <div className="calc-blc__col-name">{loc[lang!].price}:</div>
                    <div className="calc-blc__col-val">{loc[lang!].currency} 11 990</div>
                </div>
                <div className="calc-blc__slash">&nbsp;/&nbsp;</div>
                <div className="calc-blc__col calc-blc__col--date">
                    <div className="calc-blc__col-name">{loc[lang!].delivery}:</div>
                    <div className="calc-blc__col-val">29.09.2018</div>
                </div>
            </div>
        );
    }
}

export {
    OrderInfo,
};