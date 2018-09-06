import * as React from 'react';
import { inject, observer } from 'mobx-react';
import { Header as Component } from './component';

@inject(({ user, routing }, nextProps: HeaderContainerProps) => {
    return {
        userStore: user,
        path: routing.location!.pathname,
        ...nextProps,
    };
})
@observer
class Header extends React.PureComponent<HeaderContainerProps> {
    render() {
        const {
            path,
        } = this.props;
        return (
            <Component path={path} />
        );
    }
}

export {
    Header,
};