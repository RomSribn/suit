import React, { Component } from 'react'
import { observer, inject } from 'mobx-react'
import { Route, withRouter, Switch, Redirect } from 'react-router-dom'

import { routes, getCombinedPathAndTitle } from '../config/routes';
import CrumbRoute from '../utils/CrumbRoute';
import { Spinner } from './Spinner';
import { Common } from '../containers/Common';
import { Order } from '../pages/Order'
import { ListOrders } from '../pages/ListOrders';
import Login from './Login'

let dummyWasRendered = false;

@inject(({user, app, order}) => ({
  user,
  app,
  order: order.order
}))
@observer
class Wrapper extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showSpinner: false
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
      app
    } = this.props;
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
            <Route path={routes.login} component={() => <Login shouldRedirect={true}/>} />
            <Route exact path={routes.index} render={() => {
              if (!dummyWasRendered) {
                dummyWasRendered = true;
                this.showSpinner();
              }
              return <Redirect to={routes.order} />;
            }}/>
            {
              !dummyWasRendered &&
              <Route path={`${routes.details}/:any`} component={ () =><Redirect to={routes.order} /> } />
            }
            <CrumbRoute
              {...getCombinedPathAndTitle('order')}
              render={(props) => {
                if (!dummyWasRendered) {
                  this.showSpinner();
                  dummyWasRendered = true;
                }
                return (
                  <Order {...props } order={this.props.order} />
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
                </Switch>
              );
            }} />
          </Switch>

      </Common>
      </React.Fragment>)
  }
}


export default withRouter(Wrapper)
