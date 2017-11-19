import React from 'react'
import Logotype from '../../assets/images/svg/logo.svg'
import Pocket from '../../assets/images/svg/pocket.svg'
import Arrow from '../../assets/images/svg/left-arrow.svg'

const Header = () => {
  return (
    <header className="header">
      <div className="container">

        <div className="logotype">
          <a className="logotype-content">
            <img src="http://via.placeholder.com/52x59" alt="Логотип" height="100%"/>
            <span>Мой костюм</span>
          </a>
        </div>

        <nav className="nav">
          <ul className="list">
            <li className="list-item">Пиджак</li>
            <li className="list-item">Брюки</li>
            <li className="list-item">Сорочка</li>
            <li className="list-item">Галстук</li>
            <li className="list-item">Жилет</li>
            <li className="list-item">Пальто</li>
            <li className="list-item">Куртка</li>
            <li className="list-item">Обувь</li>
          </ul>
        </nav>

        <div className="controls">
          <a className="enter">Войти</a>
          <button className="lang">
            ru
            {/*<img src={Arrow} alt="arrow"/>*/}
          </button>
          <img className="cart" src={Pocket} alt="Cart" height="100%"/>
        </div>

      </div>
    </header>
  )
};

export default Header;