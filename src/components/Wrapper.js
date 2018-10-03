import React, { Component } from 'react'
import { observer, inject } from 'mobx-react'
import { Route, withRouter, Switch, Redirect } from 'react-router-dom'

import { navigationRoutes as routes, routes as commonRoutes } from '../config/routes';
import { Spinner } from './Spinner';
import { Common } from '../containers/Common';
import { Order } from '../pages/Order'
import { ListOrders } from '../pages/ListOrders';
import Login from './Login'

let orderPageWasRendered = false;

@inject(({user, app, order}) => ({
  user,
  app,
  order: order.order,
})) @observer
class Wrapper extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showSpinner: false
    };
  } 
  hideSpinner = () => this.setState({ showSpinner: false });
  showSpinner = () => this.setState({ showSpinner: true });
  render() {
    const loggedIn = this.props.user.isAuth;
    // TODO: Реализовать HOC'и для страниц со спиннерами
    return (<React.Fragment key="common wrapper with spinner">
      {this.state.showSpinner && <Spinner />}
      <Common
        onDummyLoad={this.hideSpinner}
      >
          <Route path={routes.order} exact={true} render={() => {
            this.props.app.resetOrderPath();
            return null;
          }}/>
          <Switch>
            <Route path={commonRoutes.login} component={() => <Login shouldRedirect={true}/>} />
            <Route exact={true} path={routes.index} render={() => {
              if (!orderPageWasRendered) {
                this.showSpinner();
                orderPageWasRendered = true;
              }
              /* // TODO: убрать это после того, как добавим элементы кроме рубашки */
              return <Redirect to={routes.order + '/shirt'} />
            }}/>
            <Route
              path={routes.order}
              render={(props) => {
                if (!orderPageWasRendered) {
                  this.showSpinner();
                  orderPageWasRendered = true;
                }
                return (
                  <Order {...props } order={this.props.order} />
                )
              }}
            />
            <Route path="/" component={ () => !loggedIn ? <Redirect to="/" /> : null } />          
          </Switch>

          {/* // Закрытые страницы  */}
          <Switch>
          <Route path={routes.ordersList}>
            <ListOrders />
          </Route>
          </Switch>
      </Common>
      </React.Fragment>)
  }
}


export default withRouter(Wrapper)
