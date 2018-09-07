import React, { Component } from 'react'
import { inject, observer } from 'mobx-react'
import './Login.styl';
import { Redirect } from 'react-router';


@inject(({user, app}) => ({
  app,
  userStore: user
}))
@observer
class Login extends Component {
  constructor(props) {
    super(props)
    this.state = {
      isRemember: false
    }
  }

  onCheckboxClickHandle = (e) => {
    this.setState({isRemember: !this.state.isRemember})
    e.currentTarget.querySelector('.checkbox').classList.toggle('checkbox--checked')
  }

  handleLogin = (e) => {
    e.preventDefault()
    this.props.userStore.fetchLogin(
      this.refs.name.value,
      this.refs.pass.value
    ).then((...args) => {
      // TODO: вставить обработчик ошибок. Здесь должна быть логика "забыли пароль?"
      if (args[0] && args[0].error) {
        return
      }
      if (this.props.loginCallback) {
        this.props.loginCallback(...args);
      }
    })
  }

  render() {
    const { userStore, shouldRedirect } = this.props
    if (userStore.isAuth && shouldRedirect) {
      return <Redirect to="/" />
    }
    return <div className="login-container">
      <section className="login">
        <div className="left-side">
          <h2 className="title">Авторизация</h2>
          <p className="additional-info">Если у вас нет логина и пароля, запросите данные
            у администратора салона или технической поддержки.
            {
              // eslint-disable-next-line jsx-a11y/href-no-hash
              <a className="link forgot" href="#"> Забыли пароль?</a>
              // Введите ваш электронный адрес. Отправим на него логин и пароль
            }
          </p>
          {userStore.error && <p className="additional-info">Неверные логин или пароль, попробуйте еще раз</p>}
          <input ref="name" type="text" className="login_input" placeholder="Логин"/>
          <input ref="pass" type="password" className="login_input" placeholder="Пароль"/>
          <div className="row">
            <div className="remember" onClick={this.onCheckboxClickHandle}>
              <div className="checkbox"><div className="check"></div></div>
              <label className="cb-text">Запомнить меня</label>
            </div>
          </div>
          <div className="footer-btn-bar">
            <span>
              <button onClick={this.handleLogin} className="btn footer-btn-bar__black-btn footer-btn-bar__black-btn--invert">Войти</button>
            </span>
            <a className="footer-btn-bar__white footer-btn-bar__white--invert" href="#">назад
              <div className="footer-btn-bar__white-frame">
                <svg width="100%" height="100%">
                  <rect className="footer-btn-bar__white-rect footer-btn-bar__white-rect--1" width="100%" height="100%"/>
                  <rect className="footer-btn-bar__white-rect footer-btn-bar__white-rect--2" width="100%" height="100%"/>
                </svg>
              </div>
            </a>
          </div>
        </div>
        <div className="text">* autumn 2017 Louis Purple</div>
      </section>
    </div>
  }

}

export default Login
