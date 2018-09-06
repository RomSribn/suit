import * as React from 'react';
import { inject, observer } from 'mobx-react';
import {HeaderBar as Component } from './component';

type Props = HeaderProps & {
    appStore?: IAppStore;
    userStore?: IAppStore;
};

@inject(({ app, user }) => ({
    appStore: app,
    userStore: user,
    // TODO: Хак чтобы перерендерить нижние компоненты
    isAuth: user.isAuth
}))
@observer
class HeaderBar extends React.Component<Props> {
    render() {
        const appStore = this.props.appStore!;
        const userStore = this.props.userStore!;
        return (
            <Component
                userStore={userStore}
                lang={appStore.lang}
                setLang={appStore.setLang}
            />
        );
    }
}

export {
    HeaderBar
};
