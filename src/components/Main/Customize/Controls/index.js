import React from 'react'
import { observer } from 'mobx-react'

import LeftArrow from 'Assets/images/svg/left-arrow.svg'
import RightArrow from 'Assets/images/svg/right-arrow.svg'
import Save from 'Assets/images/svg/save.svg'


const Controls = observer(({garment, ...props}) => {
  return <div className={`controls controls--white`}>
    <div onClick={() => garment.prevGroup() } className="circle left">
      <img src={LeftArrow} alt="" />
      <span className="text">Назад</span>
    </div>
    <div className="circle center">
      <img src={Save} alt="" />
      <span className="text">Сохранить</span>
    </div>
    <div onClick={() => garment.nextGroup() } className="circle right">
      <img src={RightArrow} alt="" />
      <span className="text">Вперед</span>
    </div>
  </div>
})

export default Controls