import React, { Component } from 'react'
import { observable } from 'mobx'
import { observer } from 'mobx-react'

import Camera from 'Assets/images/svg/camera.svg'

const ControlsDesignWear = observer(({active, onClick, ...props}) => {
  return <div className={`controls controls--gray`}>
    <div className="circle center">
      <img src={Camera} alt=""/>
      <span className="text" onClick={onClick}>
        {active ? 'Открыть фото' : 'Открыть макет'}
      </span>
    </div>
  </div>
})

@observer
class ActiveImg extends Component {
  @observable active = null
  @observable photoMaket = true

  btnClick() {
    this.photoMaket = !this.photoMaket
    this.active = null
  }

  imgClick(n) {
    this.active = n
  }

  render() {
    const { garments } = this.props
    let src = null
    let fabric = null
    if(garments.active && garments.active.activeGroup
      && garments.active.section !== 'fabric') {
      fabric = garments.active.activeGroup.activeItem || garments.active.activeGroup.hovered
      src = fabric ? fabric.image_url_2d : []
    }

    let n = this.photoMaket ? 0 : 3
    let first = n, second = n+1, third = n+2
    if(this.active) {
      first = this.active
      second = this.active === n+1 ? n+2 : (this.active === n+2 ? n : n+1)
      third = this.active === n+1 ? n : (this.active === n+2 ? n+1 : n+2)
    }
    return <div className={'customize__image customize__image--wear' + (garments.active && garments.active.section === 'design' ? '' : ' transparent')}>
      <div className="wear-images">
        {/*
          Не придумал ничего адекватнее, чем перекидывание элементов между .top | .bottom
          при нажатии на них (увеличение)
        */}
        <div className="top">
          <img src={src[this.active || first]} alt=""/>
        </div>
        <div className="bottom">
          <img src={src[second]} onClick={e => this.imgClick(second)} alt=""/>
          <img src={src[third]} onClick={e => this.imgClick(third)} alt=""/>
        </div>
      </div>
      <div className="about-wear">
        <h2 className="caption">half canvas</h2>
        <span className={`fa ${fabric && fabric.image_url_3d ? 'fa-eye' : 'fa-eye-acitve'}`} />
        <p className="desc">Lorem ipsum dolor sit amet, consectetur adipisicing elit.
        Architecto dolores enim fuga minima, odit qui vel voluptate.</p>
      </div>
      <ControlsDesignWear onClick={::this.btnClick} active={this.photoMaket}/>
    </div>
  }
}

export default ActiveImg
