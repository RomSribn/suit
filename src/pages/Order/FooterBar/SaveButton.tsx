import * as React from 'react';
import { observer, inject } from 'mobx-react';
import { loc } from './loc';
import { trim } from '../../../config/routes';
import { ORDER_PATH_PARTS } from '../../../config/constants';

type P = {
    lang?: string;
    orderStore?: OrderStore;
    path?: string;
};

@inject(({app, order, routing}) => ({
    lang: app.lang,
    orderStore: order,
    activeOrderItem: order.activeElement,
    path: trim(routing.location.pathname, '/'),
}))
@observer
class SaveButton extends React.Component<P> {
    onClick = () => {
        const {
            orderStore,
            path,
        } = this.props;
        try {
            const match = path!.split('/');
            const {
                GARMENT,
                GROUP,
                SUBGROUP } = ORDER_PATH_PARTS;
            const newValue = orderStore!.order;
            newValue[match[GARMENT]][0][match[GROUP]][match[SUBGROUP]] = orderStore!.activeElement!.id;
            orderStore!.setOrder(newValue);
        } catch (_) {
            const {} = _;
        }
    }
    render() {
        const {
            lang,
        } = this.props;
        return (
            <button
                onClick={this.onClick}
                className="btn footer-btn-bar__black-btn"
            >{loc[lang!].add}
            </button>
        );
    }
}

export {
    SaveButton,
};
