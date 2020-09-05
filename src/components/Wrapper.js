import React, { Component } from 'react'
import { observer, inject } from 'mobx-react'
import { Route, withRouter, Switch, Redirect } from 'react-router-dom'

import { routes, getCombinedPathAndTitle } from '../config/routes';
import CrumbRoute from '../utils/CrumbRoute';
import { Spinner } from './Spinner';
import { Common } from '../containers/Common';
import { Order } from '../pages/Order'
import { ListOrders } from '../pages/ListOrders';
import { PopUp } from '../containers/Popup'
import MobileNavigationMenuPopup from '../components/MobileNavigationMenuPopup'
import Login from './Login'
import { ListCustomers } from '../pages/ListCustomers'
import Pdf from '../pages/Pdf'

let dummyWasRendered = false;

@inject(({ user, app, order }) => ({
  userStore: user,
  app,
  order: order.order
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
  }
  showSpinner = () => {
    this.setState({ showSpinner: true });
  }

  render() {
    const {
      app,
      userStore,
      location,
    } = this.props;
    const { lang, showMobileMenu, toggleMobileMenu, setLang, toggleLoginForm, showLoginForm } = app;
    const { logout, isAuth, profile } = userStore;
    const loggedIn = this.props.userStore.isAuth;
    const role = userStore.profile && userStore.profile.role || null;
    const isStylist = role === 'STYLIST';

    if (location.pathname === '/pdf') {
      return <Route path='/pdf' render={(props) => <Pdf {...props} {...this.props} />} />
    }
    // TODO: Реализовать HOC'и для страниц со спиннерами
    return (<React.Fragment key="common wrapper with spinner">
      {this.state.showSpinner && <Spinner />}
      <Common
        onDummyLoad={this.hideSpinner}
      >
        <PopUp open={showMobileMenu}>
          {
            showMobileMenu && showLoginForm ?
              <Login loginCallback={toggleLoginForm} closeForm={toggleLoginForm} /> : <MobileNavigationMenuPopup
                currentLang={lang}
                closeMenu={toggleMobileMenu}
                toggleLoginForm={toggleLoginForm}
                setLang={setLang}
                sideEffects={{
                  logout: logout.bind(userStore)
                }}
                role={role}
              />

          }
        </PopUp>
        <Route path={routes.order} exact={true} render={() => {
          this.props.app.resetOrderPath();
          return null;
        }} />
        <Switch>
          <Route path={routes.login} component={() => <Login shouldRedirect={true} />} />
          <Route exact path={routes.index} render={() => {
            if (!dummyWasRendered) {
              dummyWasRendered = true;
              this.showSpinner();
            }
            return <Redirect to={'order/details/shirt/fabric_ref/fabric'} />;
          }} />
          {
            !userStore.isAuth && <Route path={`${routes.details}/:garment/fitting/fitting`} component={({ match, location }) => {
              return <Redirect to={`${routes.details}/${match.params.garment}${location.search}`} />;
            }} />
          }
          <CrumbRoute
            {...getCombinedPathAndTitle('order')}
            render={(props) => {
              if (!dummyWasRendered) {
                this.showSpinner();
                dummyWasRendered = true;
              }
              return (
                <Order {...props} order={this.props.order} />
              )
            }}
          />

          {/* // Закрытые страницы  */}
          <Route path={routes.index} render={() => {
            if (!loggedIn) {
              return <Redirect to={routes.index} />;
            }
            return (
              <Switch>
                <CrumbRoute {...getCombinedPathAndTitle('ordersList')}>
                  <ListOrders />
                </CrumbRoute>
                <CrumbRoute {...getCombinedPathAndTitle('customersList')}>
                  {isStylist ? <ListCustomers /> : <Redirect to={routes.index} />}
                </CrumbRoute>
              </Switch>
            );
          }} />
        </Switch>

      </Common>
    </React.Fragment>)
  }
}


export default withRouter(Wrapper)
