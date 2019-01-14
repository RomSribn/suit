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
  sideEffects: [() => void]
};

type MenuLink = {
  name: string,
  url: string,
  sideEffect?: string
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
    name: 'clients',
    url: '/clients'
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
    name: 'tasks',
    url: '/tasks'
  },
  {
    name: 'analytics',
    url: '/analytics'
  },
  {
    name: 'settings',
    url: '/settings'
  },
  {
    name: 'logOut',
    url: '/',
    sideEffect: 'logout'
  },
];

export default ({ currentLang = 'en', closeMenu, setLang, sideEffects }: Props) => (
  <div className="mobile-menu">
    <header className="mobile-menu-header">
      <button className="close-button" onClick={closeMenu}>
        <img src="/assets/img/controls/close.svg" alt="close button" className="close-button-img"/>
      </button>
    </header>
    <main className="mobile-menu-main">
      <nav className="navigation-list">
      {
        menuList.map((navItem) => (
          <Switch>
            <Route
                key={navItem.name}
                className="navigation-list-item"
                // path={routes.subgroupChoice}
                component={(...props: any[]) => { // tslint:disable-line
                    return (
                        <Link
                          className="navigation-item"
                          to={navItem.url}
                          onClick={(e) => {
                            if (sideEffects[navItem.sideEffect!]) {
                              e.preventDefault();
                              callList([closeMenu, sideEffects[navItem.sideEffect!]]);
                            } else {
                              callList([closeMenu]);
                            }
                          }}
                        >
                           <span>{loc[currentLang][navItem.name]}</span>
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