import React from 'react'
import { observer, inject } from 'mobx-react'

import Question from 'Assets/images/svg/question.svg'
import Show from 'Assets/images/svg/show.svg'
import More from 'Assets/images/svg/more.svg'

const Controls = inject('app')(observer(({garments, app, ...props}) => {
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
    <div className="circle right" onClick={() => app.isMore = !app.isMore}>
      <img src={More} alt="" />
      <span className="text">{!app.isMore ? 'Подробнее' : 'Закрыть'}</span>
    </div>
  </div>

}))

export default Controls;
