import * as React from 'react';
import { HeaderBar } from './HeaderBar';
import { HeaderContent } from './HeaderContent';
import MobileHeader from './MobileHeader';
import './style.styl';
import { HeaderProps } from './typings';

import { isMobile } from '../../utils';

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
            isAuth,
            openMenu,
            setCrumbs,
            title
        } = this.props;

        return (
            <div className="main__header">
            {
                !isMobile() ?
                <div className="header-wrapper">
                    <HeaderBar
                        lang={lang}
                        userStore={userStore}
                        isAuth={isAuth}
                    />
                    <HeaderContent
                        path={path!}
                        lang={lang}
                        orderPath={appStore.orderPath}
                        cutOrderPath={appStore.cutOrderPath}
                        isAuth={userStore.isAuth}
                    />
                </div> :
                <div className="header-wrapper-mobile">
                    <MobileHeader
                        openMenu={openMenu}
                        title={title}
                        setCrumbs={setCrumbs}
                        lang={lang}
                    />
                </div>
            }
            </div>);
    }
}

export {
    Header,
};
