import React, { Component } from 'react'
import { observer, inject } from 'mobx-react'
import { Route, withRouter, Switch, Redirect } from 'react-router-dom'

import { navigationRoutes as routes, routes as commonRoutes } from '../config/routes';
import { Common } from '../containers/Common';
import { Order } from '../pages/Order'
import { ListOrders } from '../pages/ListOrders';
import Login from './Login'
import { Spinner } from './Spinner';

@inject(({user, app, order}) => ({
  user,
  app,
  order: order.order,
})) @observer
class Wrapper extends Component {
  state = { showSpinner: true };
  hideSpinner = () => this.setState({ showSpinner: false });
  render() {
    const loggedIn = this.props.user.isAuth;
    return (<Common showSpinner={this.state.showSpinner}>
        <Route path={routes.order} exact={true} render={() => {
          this.props.app.resetOrderPath();
          return null;
        }}/>
        <Switch>
          <Route path={commonRoutes.login} component={() => <Login shouldRedirect={true}/>} />
          <Route exact={true} path={routes.index}>
            {/* // TODO: убрать это после того, как добавим элементы кроме рубашки */}
            <Redirect to={routes.order + '/shirt'} />
          </Route>
          <Route
            path={routes.order}
            render={(props) => {
              return (
                <React.Fragment key="widget with spinner">
                  {this.state.showSpinner && <Spinner />}
                  <Order {...props } order={this.props.order} onDummyLoad={this.hideSpinner}/>
                </React.Fragment>
              )
            }}
          />
          <Route path="/" component={ () => !loggedIn ? <Redirect to="/" /> : null } />          
        </Switch>

        {/* // Закрытые страницы  */}
        <Switch>
            <Route path={routes.ordersList}><ListOrders /></Route>
        </Switch>
    </Common>)
  }
}


export default withRouter(Wrapper)
