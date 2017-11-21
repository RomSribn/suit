import React, {Component} from 'react'

import App from 'Components/App'

class AppContainer extends Component {
  render() {
    return <App {...this.props} />
  }
}

export default AppContainer
