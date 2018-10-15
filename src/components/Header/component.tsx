import * as React from 'react';
import { HeaderBar } from './HeaderBar';
import { HeaderContent } from './HeaderContent';

class Header extends React.Component<HeaderProps> {
    static defaultProps = {
        userName: undefined,
    };
    render() {
        const {
            path,
            lang,
            appStore,
            userStore,
            isAuth
        } = this.props;
        return (
            <div className="main__header">
                <HeaderBar
                    lang={lang}
                    setLang={appStore.setLang}
                    userStore={userStore}
                    isAuth={isAuth}
                />
                <HeaderContent
                    path={path!}
                    lang={lang}
                    orderPath={appStore.orderPath}
                    cutOrderPath={appStore.cutOrderPath}
                />
            </div>);
    }
}

export {
    Header,
};