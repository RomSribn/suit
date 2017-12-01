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

      <img
        src="http://www.fudgegraphics.com/downloads/fabric/fudgegraphics-creased-fabric-10.jpg"
        className="customize__image customize__image--cloth"
      />
      <img
        src="http://via.placeholder.com/375x780"
        className="customize__image customize__image--wear hidden"
      />

      <div className="customize__controls">

        <OrderData/>
        <div className="search">
          <Search/>
        </div>


        {/* Скрытый блок */}
        <div className="list-container">
          <CustomizeList/>
        </div>
        {/* //////////// */}

        <div className="list-container list-container--hidden">
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
