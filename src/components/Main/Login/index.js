import React, { Component } from 'react';

class Login extends Component {
  constructor(props) {
    super(props)
    this.state = {
      isRemember: false
    }
  }

  onCheckboxClickHandle (e) {
    this.setState({isRemember: !this.state.isRemember})
    e.currentTarget.querySelector('.checkbox').classList.toggle('checkbox--checked')
    console.log(e.currentTarget)
  }

  onExitClickHandle (e) {
    e.preventDefault()
    document.querySelector('.login-container').style.display = "none"
  }

  render() {
    return (
      <div className="login-container">
        <section className="login">
          <button className="exit" onClick={::this.onExitClickHandle}>x</button>
          <div className="left-side">
            <h2 className="title">Авторизация</h2>
            <p className="additional-info">Если у вас нет логина и пароля, запросите данные
              у вашего стилиста, либо у администратора</p>
            <input type="text" className="login_input" placeholder="Логин"/>
            <input type="password" className="login_input" placeholder="Пароль"/>
            <div className="row">
              <div className="remember" onClick={::this.onCheckboxClickHandle}>
                <div className="checkbox"><div className="check"></div></div>
                <label className="cb-text">Запомнить меня</label>
              </div>
                <a className="link forgot" href="#">Забыли пароль?</a>
            </div>
            <button className="login_input">Войти в систему</button>
          </div>
        </section>
      </div>
    );
  }

}

export default Login;
