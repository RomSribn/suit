import React, { Component } from 'react';
import { Common } from '../containers/Common';
import { ListCustomers } from '../pages/ListCustomers';
import { ListOrders } from '../pages/ListOrders';
import { Store } from '../pages/Store';
import { observer, inject } from 'mobx-react';
import { Order } from '../pages/Order';
import { PopUp } from '../containers/Popup';
import { Route, withRouter, Switch, Redirect } from 'react-router-dom';
import { routes, getCombinedPathAndTitle } from '../config/routes';
import { Spinner } from './Spinner';
import CrumbRoute from '../utils/CrumbRoute';
import Login from './Login';
import MobileNavigationMenuPopup from '../components/MobileNavigationMenuPopup';
import Pdf from '../pages/Pdf';
import history from '../history';

let dummyWasRendered = false;

@inject(({ user, app, order, garments: { garments } }) => ({
  userStore: user,
  app,
  order: order.order,
  activeGarments: [...garments.activeGarments],
  currentActiveGarment: garments.currentActiveGarment,
  setCurrentActiveGarment: garments.setCurrentActiveGarment,
}))
@observer
class Wrapper extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showSpinner: false,
      showLoginForm: false,
    };
  }
  hideSpinner = () => {
    dummyWasRendered = true;
    this.setState({ showSpinner: false });
  };
  showSpinner = () => {
    this.setState({ showSpinner: true });
  };

  render() {
    const {
      app,
      userStore,
      location,
      activeGarments,
      currentActiveGarment,
      setCurrentActiveGarment,
    } = this.props;
    const { lang, showMobileMenu, toggleMobileMenu, setLang } = app;
    const { logout, isAuth, profile } = userStore;
    const loggedIn = this.props.userStore.isAuth;
    const role = (profile && profile.role) || null;
    const isStylist = role === 'STYLIST';

    if (location.pathname === '/pdf') {
      return <Route path="/pdf" render={(props) => <Pdf {...props} />} />;
    }
    // TODO: Реализовать HOC'и для страниц со спиннерами
    return (
      <React.Fragment key="common wrapper with spinner">
        {this.state.showSpinner && <Spinner />}
        <Common onDummyLoad={this.hideSpinner}>
          <PopUp open={showMobileMenu}>
            <MobileNavigationMenuPopup
              currentLang={lang}
              closeMenu={toggleMobileMenu}
              setLang={setLang}
              sideEffects={{
                logout: logout.bind(userStore),
              }}
              role={app.isMenuHidden ? 'HIDDEN' : role}
              activeGarments={activeGarments}
              currentActiveGarment={currentActiveGarment}
              setCurrentActiveGarment={setCurrentActiveGarment}
            />
          </PopUp>
          <Route
            path={routes.order}
            exact={true}
            render={() => {
              this.props.app.resetOrderPath();
              return null;
            }}
          />
          <Switch>
            <Route
              path={routes.login}
              component={() => (
                <Login
                  shouldRedirect={true}
                  closeForm={() => history.push('/')}
                />
              )}
            />
            <Route
              exact
              path={routes.index}
              render={() => {
                if (!dummyWasRendered) {
                  dummyWasRendered = true;
                  this.showSpinner();
                }
                return <Redirect to={'/order'} />;
              }}
            />
            <CrumbRoute {...getCombinedPathAndTitle('store')}>
              <Store />
            </CrumbRoute>
            {!userStore.isAuth && (
              <Route
                path={`${routes.details}/:garment/fitting`}
                component={({ match, location }) => {
                  return (
                    <Redirect
                      to={`${routes.details}/${match.params.garment}${location.search}`}
                    />
                  );
                }}
              />
            )}
            <CrumbRoute
              {...getCombinedPathAndTitle('order')}
              render={(props) => {
                if (!dummyWasRendered) {
                  this.showSpinner();
                  dummyWasRendered = true;
                }
                return (
                  <Order
                    {...props}
                    order={this.props.order}
                    dummyWasRendered={dummyWasRendered}
                  />
                );
              }}
            />
            <CrumbRoute {...getCombinedPathAndTitle('ordersList')}>
              <ListOrders />
            </CrumbRoute>

            {/* // Закрытые страницы  */}
            <Route
              path={routes.index}
              render={() => {
                if (!loggedIn) {
                  return <Redirect to={routes.index} />;
                }
                return (
                  <Switch>
                    <CrumbRoute {...getCombinedPathAndTitle('customersList')}>
                      {isStylist ? (
                        <ListCustomers />
                      ) : (
                        <Redirect to={routes.index} />
                      )}
                    </CrumbRoute>
                  </Switch>
                );
              }}
            />
          </Switch>
        </Common>
      </React.Fragment>
    );
  }
}

export default withRouter(Wrapper);
