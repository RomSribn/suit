import React, {Component} from 'react'
import {connect} from 'react-redux'
import {withRouter} from 'react-router-dom'

import App from '../components/App'

class AppContainer extends Component {
  componentWillMount() {
    if (!this.props.isAuth) {
      this.props.history.push('/login')
    }
  }

  componentWillUpdate(nextProps) {
    if (!nextProps.isAuth && this.props.history.location.pathname !== '/login') {
      this.props.history.push('/login')
    }
  }

  render() {
    return <App {...this.props} />
  }
}

const mapStateToProps = (state, ownProps) => {
  const {auth} = state
  return {isAuth: auth.isAuth}
};

export default withRouter(connect(mapStateToProps)(AppContainer))
