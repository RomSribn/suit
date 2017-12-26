import React, { Component } from 'react'
import { inject, observer } from 'mobx-react'

import ActiveFabric from './ActiveFabric'
import ActiveImg from './ActiveImg'
import CustomizeList from './CustomizeList'
import OrderData from './CustomizeOrderData'
import Search from './Search'
import Controls from './Controls'
import CustomizeDesign from './CustomizeDesign'
import CustomizeFitting from './CustomizeFitting'

import Camera from 'Assets/images/svg/camera.svg'

const ControlsDesignWear = () => {
  return <div className={`controls controls--gray`}>
    <div className="circle center">
      <img src={Camera} alt=""/>
      <span className="text">Открыть фото</span>
    </div>
  </div>
}

class Customize extends Component {
  renderSelectable() {
    const { garments } = this.props
    switch(garments.active.section) {
      case 'fabric':
        return <CustomizeList group={garments.active.activeGroup} />
      case 'design':
        return <CustomizeDesign garment={garments.active} />
      case 'fitting':
        return <CustomizeFitting />
      default:
        return <CustomizeList group={garments.active.activeGroup} />
    }
  }

  render() {
    const { garments } = this.props

    return (
      <div className="customize">
        <ActiveFabric garments={garments} />
        <div className={'customize__image customize__image--wear' + (garments.active && garments.active.section === 'design' ? '' : ' transparent')}>
          <div className="wear-images">
            {/*
              Не придумал ничего адекватнее, чем перекидывание элементов между .top | .bottom при нажатии на них (увеличение)
            */}
            <div className="top">
              <img src="https://via.placeholder.com/300x420" alt=""/>
            </div>
            <div className="bottom">
              <img src="https://via.placeholder.com/300x420" alt=""/>
              <img src="https://via.placeholder.com/300x420" alt=""/>
            </div>
          </div>
          <div className="about-wear">
            <h2 className="caption">half canvas</h2>
            <span className="fa fa-eye" onClick={e => e.currentTarget.classList.toggle('fa-eye--active')}/> {/* TODO реакция на нажатие глаза + это переключение класса*/}
            <p className="desc">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Architecto dolores enim fuga minima, odit qui vel voluptate.</p>
          </div>
          <ControlsDesignWear />
        </div>
        {/*<ActiveImg garments={garments} />*/}

        {garments.active &&
          <div className="customize__controls">

            <OrderData/>
            <div className="search">
              {garments.active && (garments.active.section === 'fabric' || garments.active.section === 'design') &&
                <Search group={garments.active.activeGroup}/>
              }
            </div>

            <div className="list-container">
              {this.renderSelectable()}
            </div>

            <Controls garment={garments.active}/>


          </div>
        }
      </div>
    )
  }
}

export default inject('garments', 'app' )(observer(Customize))
