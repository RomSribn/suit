import React from 'react'
import { Provider } from 'mobx-react'
import { Router } from 'react-router-dom'

import stores from '../stores'
import history from '../history'

import Wrapper from './Wrapper'

if(!!localStorage.getItem('AuthUser')) {
  history.push('/login')
}

const App = ({...props}) => {
  return <Provider {...stores}>
    <Router history={history}>
      <Wrapper />
    </Router>
  </Provider>
}

export default App
