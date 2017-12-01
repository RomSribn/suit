import React, { Component } from 'react'
import { inject, observer } from 'mobx-react'
import { observable } from 'mobx'
import cx from 'classnames'
import { Link } from 'react-router-dom'

import locale from './locale'

import LogotypeNText from 'Assets/images/svg/logowithtext.svg'
import Cart from 'Assets/images/svg/cart.svg'



@inject('app', 'user') @observer
class Header extends Component {
  @observable isOpened

  showLangs() {
    this.isOpened = !this.isOpened
  }

  clicHandle(lang) {
    this.showLangs()
    this.props.app.lang = lang
  }

  render() {
    const langNavClass = cx('nav', {
      'nav--active': this.isOpened
    })
    const garmentNavClass = cx('nav', {
      'nav--active': !this.isOpened
    })
    const { app, user } = this.props
    const { lang } = app

    return (
      <header className="header">
        <div className="container">

          <div className="logotype">
            <a className="logotype-content">
              <img src={LogotypeNText} alt="Логотип"/>
            </a>
          </div>

          <nav className={garmentNavClass}>
            <ul className="list">

              <li className="list-item">
                <p className="list-item_content">Пиджак</p>
              </li>
              <li className="list-item">
                <p className="list-item_content">Брюки</p>
              </li>
              <li className="list-item">
                <p className="list-item_content">Сорочка</p>
              </li>
              <li className="list-item">
                <p className="list-item_content">Галстук</p>
              </li>
              <li className="list-item">
                <p className="list-item_content">Жилет</p>
              </li>
              <li className="list-item">
                <p className="list-item_content">Пальто</p>
              </li>
              <li className="list-item">
                <p className="list-item_content">Куртка</p>
              </li>
              <li className="list-item">
                <p className="list-item_content">Обувь</p>
              </li>
            </ul>
          </nav>

          <nav className={langNavClass}>
            <ul className="list">

              <li className="list-item" onClick={e => this.clicHandle('ru')}>
                <p className="list-item_content">Russian</p>
              </li>
              <li className="list-item" onClick={e => this.clicHandle('en')}>
                <p className="list-item_content">English</p>
              </li>
              <li className="list-item" onClick={e => this.clicHandle('de')}>
                <p className="list-item_content">German</p>
              </li>
              <li className="list-item" onClick={e => this.clicHandle('fr')}>
                <p className="list-item_content">French</p>
              </li>
              <li className="list-item" onClick={e => this.clicHandle('bg')}>
                <p className="list-item_content">Bulgarian</p>
              </li>

            </ul>
          </nav>

          <div className="user">
            {!user.isAuth && <Link to="/login" className="user_enter">{locale[lang].enter}</Link>}
            {user.isAuth && <a onClick={e => user.logout()} className="user_enter">{locale[lang].leave}</a>}
            <div className="user_lang"
              onClick={::this.showLangs}>
              <span>{lang}</span>
            </div>
            <a className="user_cart"><img className="user_cart-img" src={Cart} alt="Cart" height="32"/></a>
          </div>

        </div>
      </header>
    )
  }
}

export default Header
