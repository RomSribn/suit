import * as React from 'react';
import { inject, observer } from 'mobx-react';
import { Header as Component } from './component';

@inject(({ user, routing }, nextProps: HeaderContainerProps) => {
    return {
        userName: user.profile,
        path: routing.location!.pathname,
        ...nextProps,
    };
})
@observer
class Header extends React.Component<HeaderContainerProps> {
    render() {
        const {
            userName,
            path,
        } = this.props;
        return (
            <Component
                path={path}
                userName={userName}
            />
        );
    }
}

export {
    Header,
};