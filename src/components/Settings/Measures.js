import React from 'react'
import {inject, observer} from "mobx-react";
import {MYBRow} from '../Main/MeasureYourBody/index'

import Settings from 'Assets/images/svg/settings.svg'
import Phone from 'Assets/images/svg/phone.svg'
import Cart from 'Assets/images/svg/cart.svg'

const Controls = () => {
  return <div className={`controls controls--gray`}>
    <div className="circle left">
      <img src={Settings} alt=""/>
      <span className="text">Где заказ?</span>
    </div>
    <div className="circle center">
      <img src={Phone} alt=""/>
      <span className="text">Звонок стилиста</span>
    </div>
    <div className="circle right">
      <img src={Cart} alt=""/>
      <span className="text">В корзину</span>
    </div>
  </div>
}

let userImage = 'https://pp.userapi.com/c840337/v840337301/3c1f7/F1sRUtxR5Hs.jpg'

const SettingsMeasures = inject('garments')(observer((props) => {
  return <section className="settings-measures">
    <div className="left-container">
      <section className="user-info" style={{backgroundImage: `url(${userImage})`}}>
        <div className='user-info_container'>
          <h2 className='user-info_fullname'>Anatoliy Ivanov</h2>
          <div className='user-info__contacts'>
            <span className='user-info_email'>email@mail.com</span><br/>
            <span className='user-info_tel'>+7 (495) 234-12-34</span><br/>
            <span className="user-info_birth">24.03.1975</span>
          </div>
        </div>
      </section>
    </div>
    <div className="right-container">
      <div className="measures">
        <nav className="measures_nav">
          <h2 className="heading">Settings</h2>
          <h2 className="heading heading-highlighted">Measure</h2>
        </nav>
        <div className="myb-inputs-container">
          {/* TODO ...как в MeasureYourBody */}
          {/*<MYBRow />*/}
        </div>
        <Controls/>
      </div>
    </div>
  </section>
}));


export default SettingsMeasures;