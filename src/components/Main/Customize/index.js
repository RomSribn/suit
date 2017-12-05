import React from 'react'
import { inject, observer } from 'mobx-react'

import ActiveFabric from './ActiveFabric'
import ActiveImg from './ActiveImg'
import CustomizeList from './CustomizeList'
import OrderData from './CustomizeOrderData'
import Search from './Search'
import Controls from './Controls'
import CustomizeDesign from './CustomizeDesign'



const Customize = inject('garments')(observer((props) => {
  const { garments } = props

  return (
    <div className="customize">
      <ActiveFabric garments={garments} />
      <ActiveImg garments={garments} />

      {garments.active &&
        <div className="customize__controls">

          <OrderData/>
          <div className="search">
            <Search/>
          </div>


          <div className="list-container">
            <CustomizeList group={garments.active.activeGroup} />
          </div>


          {/*<div className="list-container list-container--hidden">
            <CustomizeDesign />
          </div>*/}

          <Controls garment={garments.active}/>


        </div>
      }
    </div>
  )
}))

export default Customize;
