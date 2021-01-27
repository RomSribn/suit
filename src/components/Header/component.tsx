import * as React from 'react';
import { HeaderBar } from './HeaderBar';
import { HeaderContent } from './HeaderContent';
import MobileHeader from './MobileHeader';
// import { HeaderProps } from './typings';
import { routes } from '../../config/routes';

import './style.styl';
import { GarmentChoise } from '../../pages/Order/GarmentChoiseForm/';

const isOrderDetails = () => window.location.pathname.includes(routes.details);
const isNotDesignPart = () => !window.location.pathname.includes('design/');
const isMobile = () => document.body.offsetWidth <= 700;
const isLandscape = () => parseInt((window.orientation || 0).toString(), 10) !== 0;

class Header extends React.Component<HeaderProps, { isMobile: boolean, isLandscape: boolean }> {
    static defaultProps = {
        userName: undefined,
    };

    state = {
        isMobile: isMobile(),
        isLandscape: isLandscape(),
        // isRealIndexPage: isRealIndexPage(),
    };

    listener = () => {
        setTimeout(() => {
            this.setState({
                isMobile: isMobile(),
                isLandscape: isLandscape(),
                // isRealIndexPage: isRealIndexPage(),
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
            openMenu
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
                            {isOrderDetails() && isNotDesignPart() && <GarmentChoise isNavigationGarments={true} />}
                        </div> :
                        <div
                            className="header-wrapper-mobile"
                            style={{
                                padding: path!.includes('order/') ? '0 1rem' : 0
                            }}
                        >
                            <MobileHeader
                                path={path!}
                                openMenu={openMenu}
                                lang={lang}
                                isLandscape={state.isLandscape}
                                isAuth={isAuth}
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

export { Header };
