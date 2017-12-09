import React, { Component } from 'react'
import { observer, inject } from 'mobx-react'
import { Route, withRouter } from 'react-router-dom'

import Header from './Header'
import Main from './Main'
import Login from './Login'

@inject('user') @observer
class Wrapper extends Component {
  componentWillMount() {
    this.checkLocation(this.props)
  }

  componentWillUpdate(nextProps) {
    this.checkLocation(nextProps)
  }

  checkLocation(props) {
    const { user, history, location } = props
    if(!user.isAuth && location.pathname !== '/login') {
      //history.push('/login')
    }
    if(user.isAuth && location.pathname === '/login') {
      history.push('/')
    }
  }

  render() {
    return <div className="application" data-auth={this.props.user.isAuth}>
      <Header/>
      <Route exact path="/" component={Main} />
      <Route path="/login" component={Login} />
    </div>
  }
}


export default withRouter(Wrapper)
