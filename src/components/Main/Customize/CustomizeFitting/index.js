import React, { Component } from 'react'
import { inject, observer } from 'mobx-react'

class CustomizeFitting extends Component {
  componentWillMount() {
    const { garments, user, app } = this.props
    if(user.isAuth) {
      //garments.createOrder()
    } else {
      app.showLoginForm = true
    }
  }

  componentWillUpdate(nextProps) {
    const { garments } = this.props
    if(nextProps.user.isAuth) {
      //garments.createOrder()
    }
  }

  render() {
    const { app, user } = this.props
    if(!user.isAuth) {
      return <ul className="list">
        <li className="list_item list_item--opened" >
          <header className="list_header">
            <span
              onClick={e => app.showLoginForm = true}
              className="list__header_heading">
              Sign in to continue
            </span>
            <span className="fa fa-angle-right"></span>
          </header>
        </li>
      </ul>
    }
    return <ul className="list">
      <li className="list_item list_item--opened" >
        <header className="list_header">
          <span
            onClick={e => app.measureBody = !app.measureBody}
            className="list__header_heading">
            Measure your body
          </span>
          <span className="fa fa-angle-right"></span>
        </header>
      </li>
      <li className="list_item" >
        <header className="list_header">
          <span className="list__header_heading">Measure your shirt</span>
          <span className="fa fa-angle-right"></span>
        </header>
      </li>
      <li className="list_item" >
        <header className="list_header">
          <span className="list__header_heading">Use my last fitting</span>
          <span className="fa fa-angle-right"></span>
        </header>
      </li>
      <li className="list_item" >
        <header className="list_header">
          <span className="list__header_heading">Home tailor</span>
          <span className="fa fa-angle-right"></span>
        </header>
      </li>
    </ul>
  }
}

export default inject('garments', 'app', 'user')(observer(CustomizeFitting))
