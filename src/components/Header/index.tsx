import * as React from 'react';
import { inject, observer } from 'mobx-react';
import { Header as Component } from './component';

@inject(({ user, routing, app }, nextProps: HeaderContainerProps) => {
    return {
        userStore: user,
        path: routing.location!.pathname,
        appStore: app,
        ...nextProps,
    };
})
@observer
class Header extends React.Component<HeaderContainerProps> {
    render() {
        const {
            path
        } = this.props;
        const userStore = this.props.userStore!;
        const appStore = this.props.appStore!;
        
        return (
            <Component
                lang={appStore.lang}
                userStore={userStore}
                appStore={appStore}
                path={path}
            />
        );
    }
}

export {
    Header,
};