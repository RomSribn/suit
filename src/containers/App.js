import React, {Component} from 'react'

import App from '../components/App'

class AppContainer extends Component {
  render() {
    return <App {...this.props} />
  }
}

export default AppContainer
