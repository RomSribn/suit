import React from 'react'
import { inject, observer } from 'mobx-react'

import ActiveFabric from './ActiveFabric'
import ActiveImg from './ActiveImg'
import CustomizeList from './CustomizeList'
import OrderData from './CustomizeOrderData'
import Search from './Search'
import Controls from '../../../containers/Main/Controls'
import CustomizeDesign from './CustomizeDesign'

import LeftArrow from 'Assets/images/svg/left-arrow.svg'
import RightArrow from 'Assets/images/svg/right-arrow.svg'
import Save from 'Assets/images/svg/save.svg'

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

          <Controls
            color='white'
            leftIcon={LeftArrow}
            leftText={'Назад'}
            centerIcon={Save}
            centerText={'Сохранить'}
            rightIcon={RightArrow}
            rightText={'Вперед'}
          />


        </div>
      }
    </div>
  )
}))

export default Customize;
