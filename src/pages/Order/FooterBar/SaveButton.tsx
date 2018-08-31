import * as React from 'react';
import { observer, inject } from 'mobx-react';

type P = {
    orderStore?: IOrderStore;
    match?: {
        params: {
            garment: string;
            group: string;
            subgroup: string;
        }
    };
    children?: React.ReactElement<any> // tslint:disable-line no-any
};

@inject(({app, order, routing}) => ({
    orderStore: order,
    activeOrderItem: order.activeElement
}))
@observer
class SaveButton extends React.Component<P> {
    onClick = () => {
        const {
            orderStore
        } = this.props;
        try {
            if (this.props.match) {
                const { match } = this.props;
                const {
                    garment,
                    group,
                    subgroup } = match.params;
                let newValue = orderStore!.order;
                if (!newValue) {
                    newValue = {};
                }
                newValue[garment][0][group][subgroup] = {};
                newValue[garment][0][group][subgroup].our_code = orderStore!.activeElement!.our_code;
                newValue[garment][0][group][subgroup].title = orderStore!.activeElement!.title;
                orderStore!.setOrder(newValue);
            } else {
                orderStore!.saveOrder();
            }
        } catch (_) {
            const {} = _;
        }
    }
    render() {
        const {
            children
        } = this.props;
        return (
            <button
                onClick={this.onClick}
                className="btn footer-btn-bar__black-btn"
            >{children}
            </button>
        );
    }
}

export {
    SaveButton,
};
