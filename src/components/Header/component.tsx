import * as React from 'react';
import { HeaderBar } from './HeaderBar';
import { HeaderContent } from './HeaderContent';
import MobileHeader from './MobileHeader';
import { setCoverByTouchEnd } from '../../utils/common';
import { routes } from '../../config/routes';

import './style.styl';
import { GarmentChoise } from '../../pages/Order/GarmentChoiseForm/';

const isOrderDetails = () => window.location.pathname.includes(routes.details);
const isNotDesignPart = () => !window.location.pathname.includes('design/');
const isMobile = () => document.body.offsetWidth <= 700;
const isLandscape = () =>
  parseInt((window.orientation || 0).toString(), 10) !== 0;

class Header extends React.Component<HeaderProps, HeaderState> {
  static defaultProps = {
    userName: undefined,
  };

  state = {
    isMobile: isMobile(),
    isLandscape: isLandscape(),
    initialTouch: 0,
  };

  listener = () => {
    setTimeout(() => {
      this.setState({
        isMobile: isMobile(),
        isLandscape: isLandscape(),
      });
    }, 300);
  };

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
      isMenuUncovered,
    } = this.props;

    const {
      isLandscape: isLandscapeState,
      initialTouch,
      isMobile: isMobileState,
    } = this.state;

    return (
      <div className="main__header">
        {!isMobileState ? (
          <div className="header-wrapper">
            <HeaderBar lang={lang} userStore={userStore} isAuth={isAuth} />
            <HeaderContent
              path={path!}
              lang={lang}
              orderPath={appStore.orderPath}
              cutOrderPath={appStore.cutOrderPath}
              isAuth={userStore.isAuth}
            />
            {isOrderDetails() && isNotDesignPart() && (
              <GarmentChoise isNavigationGarments={true} />
            )}
          </div>
        ) : (
          <div
            className="header-wrapper-mobile"
            style={{
              padding: path!.includes('order/') ? '0 1rem' : 0,
            }}
          >
            <MobileHeader
              path={path!}
              openMenu={openMenu}
              lang={lang}
              isLandscape={isLandscapeState}
              isAuth={isAuth}
            />
            <HeaderBar lang={lang} userStore={userStore} isAuth={isAuth} />
            {isMenuUncovered && (
              <div
                className="widget-overlay"
                onClick={() => appStore.setIsMenuUncovered(false)}
                onTouchStart={(event: React.TouchEvent<HTMLInputElement>) => {
                  this.setState({
                    initialTouch: event.touches[0].clientY,
                  });
                }}
                onTouchEnd={(event: React.TouchEvent<HTMLInputElement>) =>
                  setCoverByTouchEnd(
                    event,
                    initialTouch,
                    appStore.setIsMenuUncovered,
                  )
                }
              />
            )}
          </div>
        )}
      </div>
    );
  }
}

export { Header };
