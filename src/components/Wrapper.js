import React, { Component } from 'react'
import { observer, inject } from 'mobx-react'
import { Route, withRouter, Switch, Redirect } from 'react-router-dom'

import { navigationRoutes as routes, routes as commonRoutes } from '../config/routes';
import { Common } from '../containers/Common';
import { Order } from '../pages/Order'
import Login from './Login'

@inject(({user, app, order}) => ({
  user,
  app,
  order: order.order,
})) @observer
class Wrapper extends Component {

  render() {
    return (<Common>
        <Route path={routes.order} exact={true} render={() => {
          this.props.app.resetOrderPath();
          return null;
        }}/>
        <Switch>
          <Route path={commonRoutes.login} component={() => <Login shouldRedirect={true}/>} />
          <Route exact={true} path={routes.index}>
            <Redirect to={routes.order + '/shirt'} />
          </Route>
          <Route
            path={routes.order}
            render={(props) => {
              return <Order {...props } order={this.props.order}/>;
            }}
          />
          <Route component={() => <div>Page not found</div>} />
        </Switch>
    </Common>)
  }
}


export default withRouter(Wrapper)
