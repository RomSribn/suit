import React, { Component } from 'react'
import { inject, observer } from 'mobx-react'
import { observable } from 'mobx'
import cx from 'classnames'
import { Link } from 'react-router-dom'

import locale from './locale'

import LogotypeNText from 'Assets/images/svg/logowithtext.svg'
import Cart from 'Assets/images/svg/cart.svg'



@inject('app', 'user', 'garments') @observer
class Header extends Component {
  @observable isOpened = false

  showLangs() {
    this.isOpened = !this.isOpened
  }

  crossClick() {
    this.props.app.closeAll()
    this.isOpened = false
  }

  clicHandle(lang) {
    this.showLangs()
    this.props.app.lang = lang
  }

  isShowCross() {
    const { app } = this.props
    if(app.isAnyPopup) {
      return true
    }
    if(this.isOpened) {
      return true
    }
    return false
  }

  isShowLangs() {
    const { app } = this.props
    if(app.isAnyPopup) {
      return false
    }
    if(this.isOpened) {
      return true
    }
    return false
  }

  isShowGarments() {
    const { app } = this.props
    if(app.isAnyPopup) {
      return false
    }
    if(this.isOpened) {
      return false
    }
    return true
  }

  render() {
    const { app, user, garments } = this.props
    const { lang } = app

    const langNavClass = cx('nav', {
      'nav--active': this.isShowLangs()
    })
    const garmentNavClass = cx('nav', {
      'nav--active': this.isShowGarments()
    })
    const crossClass = cx("cross", {"hidden": !this.isShowCross()})
    const cartClass = cx("user_cart", {"hidden": this.isOpened || app.isAnyPopup})
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

              <li className="list-item" onClick={e => garments.setGarment('jacket')}>
                <p className="list-item_content">Пиджак</p>
              </li>
              <li className="list-item" onClick={e => garments.setGarment('trousers')}>
                <p className="list-item_content">Брюки</p>
              </li>
              <li className="list-item" onClick={e => garments.setGarment('shirt')}>
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

          {/* До открытия выбора языков выглядит так верстка */}
          <div className="user">
            {!user.isAuth && <Link to="/login" className={`user_enter ${!this.isShowGarments() && 'invisible'}`}>{locale[lang].enter}</Link>}
            {user.isAuth &&
              <a onClick={e => app.showUserMenu = !app.showUserMenu}
                 className={`user_enter ${!this.isShowGarments() && 'invisible'}`}>
                {user.profile.username}
              </a>
            }
            <div className={`user_lang ${(this.isOpened || app.isAnyPopup) && 'hidden'}`}
              onClick={::this.showLangs}>
              <span>{lang}</span>
            </div>
            <div className={crossClass} onClick={::this.crossClick}>
              <i className="fa fa-times" />
            </div>
            <a className={cartClass}>
              <img className="user_cart-img" src={Cart} alt="Cart" height="32"/><span className="order_count">0</span>
            </a>
          </div>

          {/* После открытия языков выглядит так верстка */}
          {/*<div className="user">*/}
            {/*{!user.isAuth && <Link to="/login" className="user_enter invisible">{locale[lang].enter}</Link>} /!* добавил invisible класс *!/*/}
            {/*{user.isAuth && <a onClick={e => user.logout()} className="user_enter invisible">{locale[lang].leave}</a>} /!* добавил invisible класс *!/*/}
            {/*<div className="user_lang hidden" /!*добавил hidden класс*!/*/}
                 {/*onClick={::this.showLangs}>*/}
              {/*<span>{lang}</span>*/}
            {/*</div>*/}
            {/*<div className="cross"> /!* убрал hidden класс *!/*/}
              {/*<i className="fa fa-times" />*/}
            {/*</div>*/}
            {/*<a className="user_cart"><img className="user_cart-img" src={Cart} alt="Cart" height="32"/><span className="order_count">0</span></a>*/}
          {/*</div>*/}

        </div>
      </header>
    )
  }
}

export default Header
