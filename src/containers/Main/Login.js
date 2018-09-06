import React, {Component} from 'react'
import Login from 'Components/Main/Login'

class LoginContainer extends Component {
  render() {
    return (
      <Login shouldRedirect={true} />
    )
  }
}

export default LoginContainer