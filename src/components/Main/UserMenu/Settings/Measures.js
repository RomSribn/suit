import React from 'react'
import {observer} from "mobx-react";
import {MYBRow} from '../../MeasureYourBody'

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

const SettingsMeasures = observer(({garment, ...props}) => {
  return <section className="measures">
    <div className="measures-container">
      <nav className="measures_nav">
        <h2 className="heading">Settings</h2>
        <h2 className="heading heading-highlighted">Measure</h2>
      </nav>
      <div className="myb-inputs-container">
        {garment.fittings.map((f, i) => <MYBRow key={i} fitting={f} garment={garment}/>)}
      </div>
    </div>
    <Controls/>
  </section>
});


export default SettingsMeasures;