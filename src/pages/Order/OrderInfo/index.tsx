import * as React from 'react';
import { inject, observer } from 'mobx-react';
import { OrderInfo as Component } from './component';

@inject(({app}, nextProps) => ({
    lang: app.lang,
    ...nextProps,
}))
@observer
class OrderInfo extends React.Component<OrderInfoProps> {
    render() {
        const {
            lang,
        } = this.props;
        return (
            <Component
                lang={lang}
            />
        );
    }
}

export {
    OrderInfo,
};