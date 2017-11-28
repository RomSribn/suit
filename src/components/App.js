import React from 'react'
import { Provider } from 'mobx-react'
import { Router, Route } from 'react-router-dom'

import stores from '../stores'
import history from '../history'

import Header from './Header'
import Main from './Main'
import Login from './Login'

if(!!localStorage.getItem('AuthUser')) {
  history.push('/login')
}

const App = ({...props}) => {
  return <Provider {...stores}>
    <Router history={history}>
      <div className="application">
        <Header/>
        <Route exact path="/" component={Main} />
        <Route path="/login" component={Login} />
      </div>
    </Router>
  </Provider>
}

export default App
