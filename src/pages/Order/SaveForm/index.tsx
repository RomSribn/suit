import * as React from 'react';
import { inject, observer } from 'mobx-react';
import { SaveForm as Component } from './component';

@inject(({app, order}): InjectedStores => ({
    lang: app.lang,
    orderStore: order,
}))
@observer
class SaveForm extends React.Component<ContainerProps> {
    render() {
        const {
            close,
            lang
        } = this.props;
        const orderStore = this.props.orderStore!;
        return (
            <Component
                close={close}
                lang={lang!}
                orderStore={orderStore}
            />
        );
    }
}

export {
    SaveForm
};
