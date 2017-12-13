import React, { Component } from 'react'
import { observer, inject } from 'mobx-react'

import LeftArrow from 'Assets/images/svg/left-arrow.svg'
import RightArrow from 'Assets/images/svg/right-arrow.svg'
import Save from 'Assets/images/svg/save.svg'

@inject('app', 'user', 'garments') @observer
class Controls extends Component{
  saveHandle() {
    const { app, user, garments } = this.props
    if(user.isAuth) {
      garments.sendOrder()
    } else {
      app.showLoginForm = true
    }
  }

  render() {
    const { garment } = this.props
    return <div className={`controls controls--white`}>
      <div onClick={() => garment.prevGroup() } className="circle left">
        <img src={LeftArrow} alt="" />
        <span className="text">Назад</span>
      </div>
      <div className="circle center" onClick={::this.saveHandle}>
        <img src={Save} alt="" />
        <span className="text">Сохранить</span>
      </div>
      <div onClick={() => garment.nextGroup() } className="circle right">
        <img src={RightArrow} alt="" />
        <span className="text">Вперед</span>
      </div>
    </div>
  }
}

export default Controls
