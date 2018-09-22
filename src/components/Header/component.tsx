import * as React from 'react';
import { HeaderBar } from './HeaderBar';
import { HeaderContent } from './HeaderContent';

class Header extends React.PureComponent<HeaderProps> {
    static defaultProps = {
        userName: undefined,
    };
    render() {
        const {
            path,
            lang
        } = this.props;
        const appStore = this.props.appStore!;
        const userStore = this.props.userStore!;
        return (
            <div className="main__header">
                <HeaderBar
                    lang={lang}
                    setLang={appStore.setLang}
                    userStore={userStore}
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