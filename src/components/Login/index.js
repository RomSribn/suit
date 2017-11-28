import React, { Component } from 'react'
import { inject, observer } from 'mobx-react'


@inject('user') @observer
class Login extends Component {
  constructor(props) {
    super(props)
    this.state = {
      isRemember: false
    }
  }

  componentWillMount() {
    if(this.props.user.isAuth) {
      console.log('fired')
      this.props.history.push('/')
    }
  }

  onCheckboxClickHandle (e) {
    this.setState({isRemember: !this.state.isRemember})
    e.currentTarget.querySelector('.checkbox').classList.toggle('checkbox--checked')
    console.log(e.currentTarget)
  }

  handleLogin(e) {
    e.preventDefault()
    this.props.user.fetchLogin(
      this.refs.name.value,
      this.refs.pass.value
    )
  }


  render() {
    console.log(' in login', this.props)
    const { user } = this.props
    return <div className="login-container">
      <section className="login">
        {/*<button className="exit" onClick={::this.onExitClickHandle}>x</button>*/}
        <div className="left-side">
          <h2 className="title">Авторизация</h2>
          <p className="additional-info">Если у вас нет логина и пароля, запросите данные
            у вашего стилиста, либо у администратора</p>
          {user.error && <p className="additional-info">Неверные логин или пароль, попробуйте еще раз</p>}
          <input ref="name" type="text" className="login_input" placeholder="Логин"/>
          <input ref="pass" type="password" className="login_input" placeholder="Пароль"/>
          <div className="row">
            {/*<div className="remember" onClick={::this.onCheckboxClickHandle}>
              <div className="checkbox"><div className="check"></div></div>
              <label className="cb-text">Запомнить меня</label>
            </div>*/}
            {/*<a className="link forgot" href="#">Забыли пароль?</a>*/}
          </div>
          <button onClick={::this.handleLogin} className="login_input">Войти в систему</button>
        </div>
      </section>
    </div>
  }

}

export default Login
