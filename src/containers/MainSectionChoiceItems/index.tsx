import * as React from 'react';
import { inject, observer } from 'mobx-react';
import { ChoiceItems as Component } from './component';

@inject(( { app } ) => ({
    pushOrderPathItem: app.pushOrderPathItem,
}))
@observer
class ChoiceItems extends React.Component<ChoiceItemsProps> {
    render() {
        const { pushOrderPathItem } = this.props;
        return (
            <Component
                {...this.props}
                pushOrderPathItem={pushOrderPathItem}
            />
        );
    }
}

export {
    ChoiceItems,
};