import * as React from 'react';
import * as classNames from 'classnames';
import { loc, localesList } from './loc';
import { Switch, Route } from 'react-router';
import { Link } from 'react-router-dom';
import './style.styl';
import { callList } from '../../utils/index';

type Props = {
  currentLang: string,
  closeMenu: () => void,
  setLang: (lang: string) => void,
  toggleLoginForm: () => void,
  sideEffects: [() => void],
  role?: Role,
};

type MenuLink = {
  name: string,
  url: string,
  sideEffect?: string,
  withoutArrow?: boolean,
  withoutBaseUrl?: boolean,
  unusualSideEffect?: () => void
};

const menuList: MenuLink[] = [
  {
    name: 'order',
    url: '/order/details/shirt'
  },
  {
    name: 'panel',
    url: '/panel'
  },
  {
    name: 'customersList',
    url: '/customer/list'
  },
  {
    name: 'orderList',
    url: '/order/list'
  },
  {
    name: 'calendar',
    url: '/calendar'
  },
  {
    name: 'store',
    url: '/store'
  },
  {
    name: 'analytics',
    url: '/analytics'
  },
  {
    name: 'settings',
    url: '/settings',
  },
  {
    name: 'logOut',
    url: '/',
    sideEffect: 'logout',
    withoutArrow: true
  },
  {
    name: 'chat',
    url: 'javascript:jivo_api.open()',
    withoutArrow: true,
    withoutBaseUrl: true
  }
];

export default ({ currentLang = 'en', closeMenu, setLang, toggleLoginForm, sideEffects, role }: Props) => {
  const customerMenuList = menuList.filter(item => !['customersList', 'store', 'analytics'].includes(item.name));
  const anonMenuList: MenuLink[] = [{
    name: 'logIn',
    url: '/',
    withoutArrow: true,
    unusualSideEffect: toggleLoginForm
  },
  {
    name: 'chat',
    url: 'javascript:jivo_api.open()',
    withoutArrow: true,
    withoutBaseUrl: true
  }];
  const menuItemsByRole = {
    STYLIST: menuList,
    CUSTOMER: customerMenuList,
    ANON: anonMenuList
  };
  const currentRole = role || 'ANON';
  console.log(role); // tslint:disable-line
  return (
    <div className="mobile-menu">
      <header className="mobile-menu-header">
        <div className="mobile-menu-header__gender-block" >
          <a className="navigation-item">{loc[currentLang].forHer}</a>
          <a className="navigation-item active">{loc[currentLang].forHim}</a>
        </div>
        <button className="close-button" onClick={closeMenu}>
          <img src="/assets/img/controls/close.svg" alt="close button" className="close-button-img" />
        </button>
      </header>
      <main className="mobile-menu-main">
        <nav className="navigation-list">
          {
            menuItemsByRole[currentRole].map((navItem: MenuLink) => (
              <Switch>
                <Route
                  key={navItem.name}
                  className="navigation-list-item"
                  // path={routes.subgroupChoice}
                  component={(...props: any[]) => { // tslint:disable-line
                    return (
                      navItem.withoutBaseUrl ?
                        <a
                          className="navigation-item"
                          href={navItem.url}
                          onClick={(e) => {
                            if (navItem.unusualSideEffect) {
                              navItem.unusualSideEffect();
                            } else if (sideEffects[navItem.sideEffect!]) {
                              e.preventDefault();
                              callList([closeMenu, sideEffects[navItem.sideEffect!]]);
                            } else {
                              callList([closeMenu]);
                            }
                          }}
                        >
                          <span>{loc[currentLang][navItem.name]}</span>
                          <span>
                            <i className={`${navItem.withoutArrow ? '' : 'arrow right'}`} />
                          </span>
                        </a>
                        :
                        <Link
                          className="navigation-item"
                          to={navItem.url}
                          onClick={(e) => {
                            if (navItem.unusualSideEffect) {
                              navItem.unusualSideEffect();
                            } else if (sideEffects[navItem.sideEffect!]) {
                              e.preventDefault();
                              callList([closeMenu, sideEffects[navItem.sideEffect!]]);
                            } else {
                              callList([closeMenu]);
                            }
                          }}
                        >
                          <span>{loc[currentLang][navItem.name]}</span>
                          <span>
                            <i className={`${navItem.withoutArrow ? '' : 'arrow right'}`} />
                          </span>
                        </Link>
                    );
                  }}
                />
              </Switch>
            ))
          }
        </nav>
      </main>

      <footer className="mobile-menu-footer">
        <ul className="lang-list">
          {localesList.map((lang) =>
            <a
              className={classNames(
                'lang-list-item',
                {
                  active: currentLang === lang
                }
              )}
              onClick={() => setLang(lang)}
              key={lang}
            >
              {lang}
            </a>)
          }
        </ul>
      </footer>
    </div>
  );
};