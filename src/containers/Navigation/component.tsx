import * as React from 'react';
import * as classNames from 'classnames';
import { NavLink } from 'react-router-dom';
import * as ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import { Footer } from './Footer';
import { TRANSITION_DUARAION } from '../../config/constants';
import { navigationRoutes as routes } from '../../config/routes';
import { routes as defaultRoutes } from '../../config/routes';
import { NotificationIcon } from '../../components/NotificationIcon';
import { isStorePageVisitedId } from '../../utils/variables';
import { loc } from './loc';

import './styles.styl';

const baseLink = String(process.env.BASE_SERVICE_LINK);

interface HeaderProps {}
export const Header = (props: HeaderProps) => {
  const isRealIndexPage = window.location.pathname === defaultRoutes.mainPage;
  return (
    <div className="navbar__header">
      <a href={baseLink} className="navbar__header">
        <img
          className="logo"
          src={
            !isRealIndexPage
              ? process.env.STATIC_IMAGES +
                'logo/' +
                process.env.SALON_ID +
                '.svg'
              : 'https://ordersystem.ru/assets/img/logo/suit_white.svg'
          }
        />
      </a>
    </div>
  );
};

interface NavigationItemProps {
  linkName: string;
  lang: string;
  showActiveClassName: boolean;
}
class NavigationItem extends React.Component<NavigationItemProps> {
  render() {
    const { linkName, lang, showActiveClassName } = this.props;
    const renderNotificationIcon = () => {
      const isStorePageVisitedValue = JSON.parse(
        localStorage.getItem(isStorePageVisitedId)!,
      );
      const isStorePageVisited =
        (isStorePageVisitedValue && !isStorePageVisitedValue.value) ||
        !isStorePageVisitedValue;
      return linkName === 'store' && isStorePageVisited ? (
        <div className="nav-notification">
          <NotificationIcon count={1} />
        </div>
      ) : (
        ''
      );
    };
    return (
      <li>
        <NavLink
          activeClassName={showActiveClassName ? 'active' : ''}
          className={classNames(
            'main-menu__link ',
            `main-menu__link--${linkName}`,
          )}
          to={routes[linkName]}
        >
          <ReactCSSTransitionGroup
            className="main-menu__link__title"
            transitionName="fade-in-absolute"
            transitionEnterTimeout={TRANSITION_DUARAION}
            transitionLeaveTimeout={TRANSITION_DUARAION}
          >
            <span key={lang} className="main-menu__link__title">
              {loc[lang].navigation[linkName]}
            </span>
          </ReactCSSTransitionGroup>
          {renderNotificationIcon()}
        </NavLink>
        {/* <NavLink to={routes[linkName]}>
          <span key={lang} className="main-menu__link__title">
            {loc[lang].navigation[linkName]}
          </span>
        </NavLink> */}
      </li>
    );
  }
}

type MakeNavigationLinks = (
  linkNames: string[],
  showActiveClassName: boolean,
  lang: string,
) => React.ReactElement<NavigationItemProps>[];
const makeNavigationLinks: MakeNavigationLinks = (
  linkNames,
  showActiveClassName,
  lang = 'en',
) => {
  return linkNames.map((name) => (
    <NavigationItem
      key={name}
      linkName={name}
      showActiveClassName={showActiveClassName}
      lang={lang}
    />
  ));
};

interface NavigationProps {
  isLogin?: boolean;
  lang: string;
  isOrderPage: boolean;
  role?: Role;
}
interface NavigationState {
  showActiveClassName: boolean;
}
class Navigation extends React.Component<NavigationProps, NavigationState> {
  static defaultProps = {
    lang: 'en',
  };
  constructor(props: NavigationProps) {
    super(props);
    this.state = {
      showActiveClassName: true,
    };
  }
  mouseEnter = () => {
    this.setState({
      showActiveClassName: false,
    });
  };
  mouseLeave = () => {
    this.setState({
      showActiveClassName: true,
    });
  };

  render() {
    const { lang, isLogin, role } = this.props;
    const stylistNavLinks = Object.keys(loc[lang].navigation);
    const customerNavLinks = ['order', 'ordersList'];
    const navLinksByRole = {
      STYLIST: stylistNavLinks,
      CUSTOMER: customerNavLinks,
    };
    return (
      <div
        className={classNames('navbar', {
          'navbar--white': window.location.pathname !== '/order',
          'navbar--transparent': window.location.pathname === '/order',
        })}
      >
        <Header />
        {isLogin && (
          <div className="navbar__middle">
            <nav
              className={`main-menu`}
              onMouseEnter={this.mouseEnter}
              onMouseLeave={this.mouseLeave}
            >
              <ul>
                {makeNavigationLinks(
                  navLinksByRole[role!],
                  this.state.showActiveClassName,
                  lang,
                )}
              </ul>
            </nav>
          </div>
        )}
        <Footer lang={lang} />
      </div>
    );
  }
}

export { Navigation };
