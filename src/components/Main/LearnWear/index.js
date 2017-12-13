import React, { Component } from 'react'
import { observer, inject } from 'mobx-react'

import LeftArrow from 'Assets/images/svg/left-arrow.svg'
import RightArrow from 'Assets/images/svg/right-arrow.svg'
import Save from 'Assets/images/svg/save.svg'

@inject('app', 'user', 'garments') @observer
class Controls extends Component {
  saveHandle() {
    const { app, user, garments } = this.props
    if(user.isAuth) {
      garments.sendOrder()
    } else {
      app.showLoginForm = true
    }
  }

  sendToBasket() {
    const { app, user, garments } = this.props
    if(user.isAuth) {
      garments.sendOrderToSalonAdmin()
    } else {
      app.showLoginForm = true
    }
  }

  render() {
    const { app } = this.props
    return <div className={`controls controls--gray`}>
      <div className="circle left" onClick={e => app.measureBody = false}>
        <img src={LeftArrow} alt=""/>
        <span className="text">Закрыть</span>
      </div>
      <div className="circle center" onClick={::this.saveHandle}>
        <img src={Save} alt=""/>
        <span className="text">Сохранить</span>
      </div>
      <div className="circle right" onClick={::this.sendToBasket}>
        <img src={RightArrow} alt=""/>
        <span className="text">В корзину</span>
      </div>
    </div>
  }
}

const LearnWear = ({garments, app}) => {
  return <section className="lw">
    <div className="lw-container">
      <h2 className="lw_heading">{garments.active.activeFitting[`title_${app.lang}`]}</h2>
      <div className="lw-content">
        <p className="lw-content_text">{garments.active.activeFitting[`description_${app.lang}`]}</p>
        <video className="lw-content_video" controls preload="metadata">
          <source src="movie.mp4" type="video/mp4"/>
          <source src="movie.webm" type="video/webm"/>
          Your browser does not support the video tag.
        </video>
      </div>
    </div>
    <Controls />
  </section>
}

export default inject('garments', 'app')(observer(LearnWear))
