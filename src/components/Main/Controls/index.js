import React from "react"
import { observer } from 'mobx-react'

import Question from 'Assets/images/svg/question.svg'
import Show from 'Assets/images/svg/show.svg'
import More from 'Assets/images/svg/more.svg'

const Controls = observer(({garments, ...props}) => {
  console.log(garments, props)
  return <div className={`controls controls--black`}>
    <div className="circle left">
      <img src={Question} alt="" />
      <span className="text">Подсказка</span>
    </div>
    <div className="circle center">
      <img src={Show} alt="" />
      <span className="text">Показать</span>
    </div>
    <div className="circle right" onClick={() => garments.isMore = !garments.isMore}>
      <img src={More} alt="" />
      <span className="text">Подробнее</span>
    </div>
  </div>

})

export default Controls;
