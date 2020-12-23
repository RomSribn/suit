import React, { Component } from 'react'
import { inject, observer } from 'mobx-react'
import { Redirect } from 'react-router';
import { LanguageControl } from '../LanguageContorl';
import { FadeIn } from '../../containers/Transitions';
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
      login: '',
      pass: ''
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
      this.state.login,
      this.state.pass
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
  backClick = (e) => {
    e.preventDefault()
    if (this.state.showForgot) {
      this.setState({showForgot: false})
    } else {
      this.props.closeForm && this.props.closeForm()
    }
  }
  onInputChange = (event) => {
    const value = event.target.value;
    this.setState({ [event.target.name]: value });
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
    return <FadeIn>
      {/* key-prop нужен для того, чтобы отработал FadeIn так как иначе считает, что children тот же самый */}
    <div className="login-container" key={lang}>
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
                onChange={this.onInputChange}
                name="login"
                type="text"
                required={true}
                className="login_input"
                placeholder={loc[lang].placeHolders.login}
               />
              <input
                onChange={this.onInputChange}
                name="pass"
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
            <Button theme="white" invertTheme={true} onClick={this.backClick}>{loc[lang].back}</Button>
            <Button
              theme="black"
              invertTheme={true}
              type="submit"
              >{this.state.showForgot ? loc[lang].forgotSend : loc[lang].login}
              </Button>
          </div>
        </div>
        <LanguageControl mobileOnly={true} className="login__language-control" />
      </form>
    </div>
    </FadeIn>
  }

}

export default Login
