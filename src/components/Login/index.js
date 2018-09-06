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
            у вашего стилиста, либо у администратора</p>
          {userStore.error && <p className="additional-info">Неверные логин или пароль, попробуйте еще раз</p>}
          <input ref="name" type="text" className="login_input" placeholder="Логин"/>
          <input ref="pass" type="password" className="login_input" placeholder="Пароль"/>
          <div className="row">
            <div className="remember" onClick={this.onCheckboxClickHandle}>
              <div className="checkbox"><div className="check"></div></div>
              <label className="cb-text">Запомнить меня</label>
            </div>
            {
              // eslint-disable-next-line jsx-a11y/href-no-hash
              <a className="link forgot" href="#">Забыли пароль?</a>
            }
          </div>
          <button onClick={this.handleLogin} className="login_input">Войти в систему</button>
        </div>
        <div className="text">* autumn 2017 Louis Purple</div>
      </section>
    </div>
  }

}

export default Login
