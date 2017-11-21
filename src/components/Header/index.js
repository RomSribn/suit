import React from 'react'
import Logotype from 'Assets/images/svg/logo.svg'
import LogotypeNText from 'Assets/images/svg/logowithtext.svg'
import Cart from 'Assets/images/svg/cart.svg'

const Header = () => {
  return (
    <header className="header">
      <div className="container">

        <div className="logotype">
          <a className="logotype-content">
            <img src={LogotypeNText} alt="Логотип"/>
            {/*<span>Мой костюм</span>*/}
          </a>
        </div>

        <nav className="nav">
          <ul className="list">
            <li className="list-item"><a className="list-item_content">Пиджак</a>
              <div className="dropdown">
                <ul className="dropdown__list">
                  <li className="dropdown__list-item"><a className="dropdown__list-item_content">Lorem ipsum</a></li>
                  <li className="dropdown__list-item"><a className="dropdown__list-item_content">Lorem ipsum</a></li>
                  <li className="dropdown__list-item"><a className="dropdown__list-item_content">Lorem ipsum</a></li>
                  <li className="dropdown__list-item"><a className="dropdown__list-item_content">Lorem ipsum</a></li>
                  <li className="dropdown__list-item"><a className="dropdown__list-item_content">Lorem ipsum</a></li>
                </ul>
              </div>
            </li>
          </ul>
        </nav>

        <div className="user">
          <a className="user_enter">Войти</a>
          <button className="user_lang">ru</button>
          <a className="user_cart"><img className="user_cart-img" src={Cart} alt="Cart" height="32"/></a>
        </div>

      </div>
    </header>
  )
};

export default Header;