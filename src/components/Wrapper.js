import React, { Component } from 'react'
import { observer, inject } from 'mobx-react'
import { Route, withRouter, Switch, Redirect } from 'react-router-dom'

import { navigationRoutes as routes, routes as commonRoutes } from '../config/routes';
import { Common } from '../containers/Common';
import { Order } from '../pages/Order'
import Login from './Login'

@inject(({user, app}) => ({
  user,
  app,
})) @observer
class Wrapper extends Component {

  render() {
    const authorized = !!localStorage.getItem('AuthUser');
    if (!authorized && window.location.pathname !== commonRoutes.login) {
      return <Redirect to={commonRoutes.login} />
    }    
    return (<Common>
        <Route path={routes.order} exact={true} render={() => {
          this.props.app.resetOrderPath();
          return null;
        }}/>
        <Switch>
          <Route path={commonRoutes.login} component={Login} />          
          <Route exact={true} path={routes.index}>
            <Redirect to={routes.order} />
          </Route>
          <Route
            path={routes.order}
            render={(props) => <Order {...props }/>}
          />
          <Route component={() => <div>Page not found</div>} />
        </Switch>
    </Common>)
  }
}


export default withRouter(Wrapper)
