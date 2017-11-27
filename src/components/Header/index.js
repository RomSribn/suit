import React from 'react'
// import Logotype from 'Assets/images/svg/logo.svg'
import LogotypeNText from 'Assets/images/svg/logowithtext.svg'
import Cart from 'Assets/images/svg/cart.svg'

function toggleLanguageSelect(e) {
  e.preventDefault();
  let target = document.querySelector('.application>header nav');
  target.classList.toggle('nav--active')
}

const Header = () => {

  return (
    <header className="header">
      <div className="container">

        <div className="logotype">
          <a className="logotype-content">
            <img src={LogotypeNText} alt="Логотип"/>
          </a>
        </div>

        <nav className="nav">
          <ul className="list">

            <li className="list-item">
              <p className="list-item_content">Russian</p>
            </li>
            <li className="list-item">
              <p className="list-item_content">English</p>
            </li>
            <li className="list-item">
              <p className="list-item_content">German</p>
            </li>
            <li className="list-item">
              <p className="list-item_content">French</p>
            </li>
            <li className="list-item">
              <p className="list-item_content">Bulgarian</p>
            </li>

          </ul>
        </nav>

        <div className="user">
          <a className="user_enter">Войти</a>
            <div className="user_lang"
              onClick={toggleLanguageSelect}>
              <span>ru</span>
            </div>
          <a className="user_cart"><img className="user_cart-img" src={Cart} alt="Cart" height="32"/></a>
        </div>

      </div>
    </header>
  )
};

export default Header;
