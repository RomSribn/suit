import * as React from 'react';
import { HeaderBar } from './HeaderBar';
import { HeaderContent } from './HeaderContent';
import MobileHeader from './MobileHeader';
import { HeaderProps } from './typings';

import './style.styl';
import { isMobile } from '../../utils';

// const isMobile = () => document.body.offsetWidth <= 800;
const isLandscape = () => parseInt((window.orientation || 0).toString(), 10) !== 0;

class Header extends React.Component<HeaderProps, { isMobile: boolean, isLandscape: boolean }> {
    static defaultProps = {
        userName: undefined,
    };

    state = {
        isMobile: isMobile(),
        isLandscape: isLandscape(),
    };

    listener = () => {
        setTimeout(() => {
            this.setState({
                isMobile: isMobile(),
                isLandscape: isLandscape(),
            });
        }, 300);
    }

    componentDidMount() {
        window.addEventListener('orientationchange', this.listener);
    }

    componentWillUnmount() {
        window.removeEventListener('orientationchange', this.listener);
    }

    render() {
        const {
            path,
            lang,
            appStore,
            userStore,
            isAuth,
            openMenu,
        } = this.props;

        const state = this.state;

        return (
            <div className="main__header">
                {
                    !state.isMobile ?
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
                                lang={lang}
                                isLandscape={state.isLandscape}
                            />
                            <HeaderBar
                                lang={lang}
                                userStore={userStore}
                                isAuth={isAuth}
                            />
                        </div>
                }
            </div>);
    }
}

export {
    Header,
};
