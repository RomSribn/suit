import * as React from 'react';
import * as classNames from 'classnames';
import { NavLink } from 'react-router-dom';
import * as ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import { Footer } from './Footer';
import { TRANSITION_DUARAION } from '../../config/constants';

import { navigationRoutes as routes } from '../../config/routes';
import { routes as defaultRoutes } from '../../config/routes';
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
  isHidden: boolean;
}
class NavigationItem extends React.Component<NavigationItemProps> {
  render() {
    const { linkName, lang, showActiveClassName, isHidden } = this.props;
    return (
      <li>
        {!isHidden ? (
          <NavLink
            activeClassName={showActiveClassName ? 'active' : ''}
            className={classNames(
              'main-menu__link ',
              `main-menu__link--${linkName}`,
            )}
            to={routes[linkName]}
          >
            <ReactCSSTransitionGroup
              transitionName="fade-in-absolute"
              transitionEnterTimeout={TRANSITION_DUARAION}
              transitionLeaveTimeout={TRANSITION_DUARAION}
            >
              <span key={lang}>{loc[lang].navigation[linkName]}</span>
            </ReactCSSTransitionGroup>
          </NavLink>
        ) : (
          <div
            className={classNames(
              'main-menu__link ',
              'link-hidden',
              `main-menu__link--${linkName}`,
            )}
          >
            <span key={lang}>{loc[lang].navigation[linkName]}</span>
          </div>
        )}
      </li>
    );
  }
}

type MakeNavigationLinks = (
  linkNames: string[],
  hiddenNavLinks: string[],
  showActiveClassName: boolean,
  lang: string,
) => React.ReactElement<NavigationItemProps>[];
const makeNavigationLinks: MakeNavigationLinks = (
  linkNames,
  hiddenNavLinks,
  showActiveClassName,
  lang = 'en',
) => {
  return linkNames.map((name) => (
    <NavigationItem
      key={name}
      linkName={name}
      showActiveClassName={showActiveClassName}
      lang={lang}
      isHidden={hiddenNavLinks.includes(name)}
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
    const sharedNavLinks: string[] = ['order', 'store'];
    const customerNavLinks: string[] = [
      'order',
      'panel',
      'ordersList',
      'calendar',
      'settings',
    ];
    const hiddenNavLinks: string[] = !isLogin
      ? ['panel', 'customersList', 'calendar', 'analytics', 'settings']
      : [];
    const navLinksByRole = {
      STYLIST: stylistNavLinks,
      CUSTOMER: customerNavLinks,
      ANON: sharedNavLinks,
    };
    const navigationLinks = isLogin ? navLinksByRole[role!] : stylistNavLinks;
    return (
      <div
        className={classNames('navbar', {
          'navbar--white': window.location.pathname !== '/order',
          'navbar--transparent': window.location.pathname === '/order',
        })}
      >
        <Header />
        <div className="navbar__middle">
          <nav
            className={`main-menu`}
            onMouseEnter={this.mouseEnter}
            onMouseLeave={this.mouseLeave}
          >
            <ul>
              {makeNavigationLinks(
                navigationLinks,
                hiddenNavLinks,
                this.state.showActiveClassName,
                lang,
              )}
            </ul>
          </nav>
        </div>
        <Footer lang={lang} />
      </div>
    );
  }
}

export { Navigation };
