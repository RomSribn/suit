import React from 'react'
import CustomizeList from './CustomizeList'
import OrderData from './CustomizeOrderData'
import Search from './Search'
import Controls from '../../../containers/Main/Controls'
import CustomizeDesign from './CustomizeDesign'

import LeftArrow from 'Assets/images/svg/left-arrow.svg'
import RightArrow from 'Assets/images/svg/right-arrow.svg'
import Save from 'Assets/images/svg/save.svg'

const Customize = () => {
  return (
    <div className="customize">
      <div className="customize__controls">

        <OrderData/>
        <div className="search">
          <Search/>
        </div>

        {/* Скрытый блок */}
        <div className="list-container list-container--hidden">
          <CustomizeList/>
        </div>
        {/* //////////// */}

        <div className="list-container">
          <CustomizeDesign />
        </div>

        <Controls
          color='white'
          leftIcon={LeftArrow}
          leftText={'Назад'}
          centerIcon={Save}
          centerText={'Сохранить'}
          rightIcon={RightArrow}
          rightText={'Вперед'}/>

      </div>
    </div>
  )
};

export default Customize;
