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
            path,
            userStore,
            appStore
        } = this.props;
        return (
            <Component
                lang={appStore!.lang}
                userStore={userStore!}
                appStore={appStore!}
                path={path}
                isAuth={userStore!.isAuth}
            />
        );
    }
}

export {
    Header,
};