import React, { Component } from 'react'
import { inject, observer } from 'mobx-react'
import { Redirect } from 'react-router';
import { Button } from '../Button';
import { loc } from './loc';
import './Login.styl';



@inject(({user, app}) => ({
  appStore: app,
  userStore: user
}))
@observer
class Login extends Component {
  constructor(props) {
    super(props)
    this.state = {
      isRemember: false,
      showForgot: false,
    }
  }

  onCheckboxClickHandle = (e) => {
    this.setState({isRemember: !this.state.isRemember})
    e.currentTarget.querySelector('.checkbox').classList.toggle('checkbox--checked')
  }

  handleLogin = (e) => {
    e.preventDefault()
    if(this.state.showForgot) {
      this.props.closeForm && this.props.closeForm();
      return;
    }
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

  forgotClick = (e) => {
    e.preventDefault();
    this.setState({ showForgot: true })
  }
  backClick = () => {
    if (this.state.showForgot) {
      this.setState({showForgot: false})
    } else {
      this.props.closeForm && this.props.closeForm()
    }
  }
  render() {
    const {
      userStore,
      appStore,
      shouldRedirect
    } = this.props
    if (userStore.isAuth && shouldRedirect) {
      return <Redirect to="/" />
    }
    const lang = appStore.lang;
    return <div className="login-container">
      <form className="login" onSubmit={this.handleLogin}>
        <div className="left-side">
          <h2 className="title">{loc[lang].title}</h2>
          <p className="additional-info">{loc[lang].info}
            { 
              !userStore.error ? null :
              // eslint-disable-next-line jsx-a11y/href-no-hash
              this.state.showForgot ? <span>{loc[lang].forgetPass}</span> :
              // eslint-disable-next-line jsx-a11y/href-no-hash              
                <a className="link forgot" href="#" onClick={this.forgotClick}>{loc[lang].forgetPass}</a>
            }
            {
              this.state.showForgot &&
              // eslint-disable-next-line jsx-a11y/href-no-hash                
              <span className="link forgot">{loc[lang].forgetText}</span>
            }
          </p>
          {!this.state.showForgot ?
            <React.Fragment>
              <input
                ref="name"
                type="text"
                required={true}
                className="login_input"
                placeholder={loc[lang].placeHolders.login}
               />
              <input
                ref="pass"
                type="password"
                className="login_input"
                placeholder={loc[lang].placeHolders.password}
              />
              <div className="row">
                <div className="remember" onClick={this.onCheckboxClickHandle}>
                  <div className="checkbox"><div className="check" /></div>
                  <label className="cb-text">{loc[lang].rememberMe}</label>
                </div>
              </div>
            </React.Fragment> :
            <input
              required={true}
              className="login_input"
              type="email"
              placeholder={loc.en.placeHolders.email}
            />
          }
          <div className="controlls-bar">
            <Button
              theme="black"
              invertTheme={true}
              type="submit"
              >{this.state.showForgot ? loc[lang].forgotSend : loc[lang].login}
              </Button>
            <Button theme="white" invertTheme={true} onClick={this.backClick}>{loc[lang].back}</Button>
          </div>
        </div>
        <div className="text">* autumn 2017 Louis Purple</div>
      </form>
    </div>
  }

}

export default Login
