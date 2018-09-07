import * as React from 'react';
import { observer, inject } from 'mobx-react';
import { SaveForm } from '../SaveForm';
import { PopUp } from '../../../containers/Popup';
import { Button } from '../../../components/Button';

type P = {
    orderStore?: IOrderStore;
    isUpdate?: boolean,
    match?: {
        params: {
            garment: string;
            group: string;
            subgroup: string;
        }
    };
    children?: React.ReactElement<any> // tslint:disable-line no-any
};
interface State {
    open: boolean;
}
@inject(({app, order, routing}) => ({
    orderStore: order,
    activeOrderItem: order.activeElement
}))
@observer
class SaveButton extends React.PureComponent<P, State> {
    constructor(props: P) {
        super(props);
        this.state = {
            open: false
        };
    }
    onClose = (e: React.MouseEvent) => {
        this.setState({ open: false });
    }
    onClick = () => {
        if (this.props.isUpdate) {
            this.updateOrder();
        } else {
            this.setState({ open: true });        
        }
    }
    updateOrder = () => {
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
                <React.Fragment key="order save popup">
                    <Button
                        onClick={this.onClick}
                        theme="black"
                    >{children}
                    </Button>
                    <PopUp onClose={this.onClose} open={this.state.open}>
                        <SaveForm close={this.onClose}/>
                    </PopUp>
                </React.Fragment>
        );
    }
}

export {
    SaveButton,
};
