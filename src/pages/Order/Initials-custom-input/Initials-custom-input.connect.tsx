import * as React from 'react';
import { inject, observer } from 'mobx-react';
import * as _ from 'lodash';
import { CommonStores } from '../../../types/commonStores';
import { InitialsCustomInput, Props } from './Initials-custom-input';

interface ConnectorProps {
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    setActiveSubgroupToInitials: () => void;
    lang: Lang;
    placeholder?: string;
    onBlur: () => void;
}

@inject<CommonStores, Props, ConnectorProps, unknown>(({order, app}) => {
    const setShirtInitials = _.debounce(order.setShirtInitials, 200);
    const shirtInfo = order.order.shirt[0];
    const onChange: ConnectorProps['onChange'] = (e) => setShirtInitials(e.target.value);
    const onBlur = () => {
        order.setActiveItem(null);
        if (order.orderInfo && order.orderInfo.orderId) {
            order.saveOrder();
        }
    };

    const setActiveSubgroupToInitials = () => {
        order.setActiveItem(
            {
                // tslint:disable-next-line
                our_code: shirtInfo.design['initials_arrangement'].our_code
            } as GalleryStoreItem
        );
    };
    return {
        onChange,
        setActiveSubgroupToInitials,
        lang: app.lang,
        placeholder: shirtInfo.design.initials_text,
        onBlur,
    };
})
@observer
class InitialsCustomInputConnect extends React.Component {
    componentDidMount() {
        const props = this.props as ConnectorProps;
        props.setActiveSubgroupToInitials();
    }
    render() {
        const props = this.props as ConnectorProps;

        return (
            <InitialsCustomInput
                onChange={props.onChange}
                lang={props.lang}
                placeholder={props.placeholder}
                onBlur={props.onBlur}
            />
        );
    }
}

export {
    InitialsCustomInputConnect
};
