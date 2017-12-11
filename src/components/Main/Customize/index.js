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
        <ActiveImg garments={garments} />

        {garments.active &&
          <div className="customize__controls">

            <OrderData/>
            <div className="search">
              {garments.active && garments.active.section === 'fabric' && <Search/>}
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

export default inject('garments', 'app')(observer(Customize))
