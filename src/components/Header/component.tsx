import * as React from 'react';
import { HeaderBar } from './HeaderBar';
import { HeaderContent } from './HeaderContent';
import MobileHeader from './MobileHeader';
import './style.styl';
import { HeaderProps } from './typings';

const isMobile = () => document.body.offsetWidth <= 450;

class Header extends React.Component<HeaderProps, {isMobile: boolean}> {
    static defaultProps = {
        userName: undefined,
    };

    state = {
        isMobile: isMobile(),
    };

    listener = () => {
        setTimeout(() => {
            this.setState({
                isMobile: isMobile(),
            });
        }, 10);
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
            setCrumbs,
            title
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
