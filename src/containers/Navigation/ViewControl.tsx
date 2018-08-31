import * as React from 'react';
import { inject, observer } from 'mobx-react';
import * as classNames from 'classnames';

interface Props {
    text: string;
    orderStore?: IOrderStore;
}

@inject(({ order }) => ({
    orderStore: order
}))
@observer
class ViewControl extends React.PureComponent<Props> {
     onClick = (element: string) => () => {
         this.props.orderStore!.toggleHiddenElement(element);
     }
    render() {
        const {
            text
        } = this.props;
        const orderStore = this.props.orderStore!;
        const activeElementCode = orderStore.activeElement && orderStore.activeElement.our_code || '';
        const elementShown = !orderStore.hiddenElements.includes(activeElementCode);
        return (
        <button
            onClick={this.onClick(activeElementCode)}
            className={classNames(
                'btn',
                {
                    'tools__item tools__item--view': elementShown,
                    'tools__item tools__item--view--hide': !elementShown,
                }
            )}
            title={text}
        />
        );
    }
}

export {
    ViewControl
};
