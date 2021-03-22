import * as React from 'react';
import * as classNames from 'classnames';
import { callList } from '../../utils/index';
import { isStorePageVisitedId } from '../../utils/variables';
import { Link } from 'react-router-dom';
import { loc, localesList } from './loc';
import { NotificationIcon } from '../../components/NotificationIcon';
import { Switch, Route } from 'react-router';
import './style.styl';

const getGarmentsSubMenu = (activeGarments: string[]): SubmenuItem[] =>
  activeGarments.map((garment) => {
    if (garment === 'shirt') {
      return {
        name: {
          ru: 'Сорочка',
          en: garment,
        },
        id: garment,
      };
    }

    if (garment === 'jacket') {
      return {
        name: {
          ru: 'Пиджак',
          en: garment,
        },
        id: garment,
      };
    }

    if (garment === 'pants') {
      return {
        name: {
          ru: 'Брюки',
          en: garment,
        },
        id: garment,
      };
    }

    return {
      name: {
        ru: 'Сорочка',
        en: garment,
      },
      id: 'shirt',
    };
  });

export default ({
  activeGarments,
  setCurrentActiveGarment,
  currentActiveGarment,
  currentLang = 'en',
  closeMenu,
  setLang,
  toggleLoginForm,
  sideEffects,
  role,
}: TMobileNavigationMenuPopupProps) => {
  const menuList: MenuLink[] = [
    {
      name: 'order',
      url: '/order',
      submenu: getGarmentsSubMenu(activeGarments || []),
    },
    {
      name: 'panel',
      url: '/panel',
    },
    {
      name: 'customersList',
      url: '/customer/list',
    },
    {
      name: 'orderList',
      url: '/orders/list',
    },
    {
      name: 'calendar',
      url: '/calendar',
    },
    {
      name: 'store',
      url: '/store',
    },
    {
      name: 'analytics',
      url: '/analytics',
    },
    {
      name: 'settings',
      url: '/settings',
    },
    {
      name: 'logOut',
      url: '/',
      sideEffect: 'logout',
      withoutArrow: true,
    },
    {
      name: 'chat',
      url: 'javascript:jivo_api.open()',
      withoutArrow: true,
      withoutBaseUrl: true,
    },
  ];
  const customerMenuList = menuList.filter(
    (item) => !['customersList', 'store', 'analytics'].includes(item.name),
  );
  const anonMenuList: MenuLink[] = [
    {
      name: 'order',
      url: '/order',
      submenu: getGarmentsSubMenu(activeGarments || []),
    },
    {
      name: 'panel',
      url: '/panel',
      isHidden: true,
    },
    {
      name: 'customersList',
      url: '/customersList',
      isHidden: true,
    },
    {
      name: 'orderList',
      url: '/orders/list',
    },
    {
      name: 'calendar',
      url: '/calendar',
      isHidden: true,
    },
    {
      name: 'store',
      url: '/store',
    },
    {
      name: 'analytics',
      url: '/analytics',
      isHidden: true,
    },
    {
      name: 'settings',
      url: '/settings',
      isHidden: true,
    },
    {
      name: 'chat',
      url: 'javascript:jivo_api.open()',
      withoutArrow: true,
      withoutBaseUrl: true,
    },
    {
      name: 'logIn',
      url: '/login',
      withoutArrow: true,
      unusualSideEffect: toggleLoginForm,
    },
  ];
  const hiddenRoleMenuLinks: MenuLink[] = [
    {
      name: 'order',
      url: '/order',
      submenu: getGarmentsSubMenu(activeGarments || []),
    },
    {
      name: 'chat',
      url: 'javascript:jivo_api.open()',
      withoutArrow: true,
      withoutBaseUrl: true,
    },
    {
      name: 'logIn',
      url: '/login',
      withoutArrow: true,
      unusualSideEffect: toggleLoginForm,
    },
  ];

  const menuItemsByRole = {
    STYLIST: menuList,
    CUSTOMER: customerMenuList,
    ANON: anonMenuList,
    HIDDEN: hiddenRoleMenuLinks,
  };

  const currentRole = role || 'ANON';
  console.log(role); // tslint:disable-line
  return (
    <div className="mobile-menu">
      <header className="mobile-menu-header">
        <div className="mobile-menu-header__gender-block">
          <a className="navigation-item">{loc[currentLang].forHer}</a>
          <a className="navigation-item active">{loc[currentLang].forHim}</a>
        </div>
        <button className="close-button" onClick={closeMenu}>
          <img
            src="/assets/img/controls/close.svg"
            alt="close button"
            className="close-button-img"
          />
        </button>
      </header>
      <main className="mobile-menu-main">
        <nav className="navigation-list">
          {menuItemsByRole[currentRole].map((navItem: MenuLink) => (
            <Switch>
              <Route
                key={navItem.name}
                className="navigation-list-item"
                // tslint:disable-next-line
                component={(...props: any[]) => {
                  const isOrder: boolean = navItem.name === 'order';
                  const isStorePageVisitedValue = JSON.parse(
                    localStorage.getItem(isStorePageVisitedId)!,
                  );
                  const isStorePageVisited =
                    (isStorePageVisitedValue &&
                      !isStorePageVisitedValue.value) ||
                    !isStorePageVisitedValue;
                  return navItem.withoutBaseUrl ? (
                    <a
                      className={classNames('navigation-item', {
                        hidden: !!navItem.isHidden,
                      })}
                      href={navItem.url}
                      onClick={(e) => {
                        if (navItem.unusualSideEffect) {
                          navItem.unusualSideEffect();
                        } else if (sideEffects[navItem.sideEffect!]) {
                          e.preventDefault();
                          callList([
                            closeMenu,
                            sideEffects[navItem.sideEffect!],
                          ]);
                        } else {
                          callList([closeMenu]);
                        }
                      }}
                    >
                      <span>{loc[currentLang][navItem.name]}</span>
                      {window.location.pathname.includes(navItem.url) && (
                        <span>
                          <i
                            className={`${
                              navItem.withoutArrow ? '' : 'arrow right'
                            }`}
                          />
                        </span>
                      )}
                    </a>
                  ) : navItem.submenu ? (
                    <div>
                      <Link
                        className={classNames('navigation-item', {
                          hidden: !!navItem.isHidden,
                        })}
                        to={`/order`}
                        onClick={(e) => {
                          if (navItem.unusualSideEffect) {
                            navItem.unusualSideEffect();
                          } else if (sideEffects[navItem.sideEffect!]) {
                            e.preventDefault();
                            callList([
                              closeMenu,
                              sideEffects[navItem.sideEffect!],
                            ]);
                          } else {
                            callList([closeMenu]);
                          }
                        }}
                      >
                        {loc[currentLang][navItem.name]}
                        {window.location.pathname === '/order' && (
                          <span>
                            <i
                              className={`${
                                navItem.withoutArrow ? '' : 'arrow right'
                              }`}
                            />
                          </span>
                        )}
                      </Link>
                      <ul>
                        {navItem.submenu.map((item: SubmenuItem) => {
                          const { pathname = '' } = window.location;
                          const redirectingPath: string = pathname.includes(
                            'order/details',
                          )
                            ? window.location.pathname.replace(
                                currentActiveGarment || '',
                                item.id,
                              )
                            : `/order/details/${item.id}/fabric_ref/fabric`;
                          return (
                            <Link
                              className="navigation-item submenu-item"
                              to={redirectingPath}
                              key={item.id}
                              onClick={(e) => {
                                callList([closeMenu]);
                                setCurrentActiveGarment!(item.id);
                              }}
                            >
                              <span>{item.name[currentLang]}</span>
                              {!isOrder && (
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  width="20"
                                  height="20"
                                  viewBox="0 0 448 512"
                                >
                                  <path
                                    fill="currentColor"
                                    d="M296 432h16a8 8 0 008-8V152a8 8 0 00-8-8h-16a8
                                             8 0 00-8 8v272a8 8 0 008 8zm-160 0h16a8 8 0 008-8V152a8
                                              8 0 00-8-8h-16a8 8 0 00-8 8v272a8 8 0 008 8zM440
                                               64H336l-33.6-44.8A48 48 0 00264 0h-80a48 48 0
                                               00-38.4 19.2L112 64H8a8 8 0 00-8 8v16a8 8 0 008
                                                8h24v368a48 48 0 0048 48h288a48 48 0 0048-48V96h24a8
                                                 8 0 008-8V72a8 8 0 00-8-8zM171.2 38.4A16.1
                                                 16.1 0 01184 32h80a16.1 16.1 0 0112.8 6.4L296
                                                 64H152zM384 464a16 16 0 01-16 16H80a16 16 0
                                                  01-16-16V96h320zm-168-32h16a8 8 0 008-8V152a8
                                                  8 0 00-8-8h-16a8 8 0 00-8 8v272a8 8 0 008 8z"
                                  />
                                </svg>
                              )}
                              {isOrder &&
                                item.id === currentActiveGarment &&
                                window.location.pathname.includes(
                                  currentActiveGarment,
                                ) && <i className={`circle`} />}
                            </Link>
                          );
                        })}
                      </ul>
                    </div>
                  ) : (
                    <Link
                      className={classNames('navigation-item', {
                        hidden: !!navItem.isHidden,
                      })}
                      to={navItem.url}
                      onClick={(e) => {
                        if (navItem.unusualSideEffect) {
                          navItem.unusualSideEffect();
                        } else if (sideEffects[navItem.sideEffect!]) {
                          e.preventDefault();
                          callList([
                            closeMenu,
                            sideEffects[navItem.sideEffect!],
                          ]);
                        } else {
                          callList([closeMenu]);
                        }
                      }}
                    >
                      <span>
                        {loc[currentLang][navItem.name]}
                        {navItem.name === 'store' && isStorePageVisited && (
                          <NotificationIcon count={1} />
                        )}
                      </span>
                      {window.location.pathname.includes(navItem.url) && (
                        <span>
                          <i
                            className={`${
                              navItem.withoutArrow ? '' : 'arrow right'
                            }`}
                          />
                        </span>
                      )}
                    </Link>
                  );
                }}
              />
            </Switch>
          ))}
        </nav>
      </main>

      <footer className="mobile-menu-footer">
        <ul className="lang-list">
          {localesList.map((lang) => (
            <a
              className={classNames('lang-list-item', {
                active: currentLang === lang,
              })}
              onClick={() => setLang(lang)}
              key={lang}
            >
              {lang}
            </a>
          ))}
        </ul>
      </footer>
    </div>
  );
};
