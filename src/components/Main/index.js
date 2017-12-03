import React from 'react'
import { inject, observer } from 'mobx-react'
//Components
import Switch from './Switch'
import Customize from './Customize'
import Dummy from 'Containers/Main/Dummy'
import Controls from 'Containers/Main/Controls'


import Question from 'Assets/images/svg/question.svg'
import Show from 'Assets/images/svg/show.svg'
import More from 'Assets/images/svg/more.svg'

const Main = inject('garments')(observer((props) => {
  const { garments } = props
  return (
    <section className="main">
      {garments.active && <Switch />}
      <div className="container">
        <div className="dummy-container">
          <Dummy />
          <Controls
            color="black"
            leftIcon={Question}
            leftText={'Подсказка'}
            centerIcon={Show}
            centerText={'Показать'}
            rightIcon={More}
            rightText={'Подробнее'}
            />
        </div>
        <Customize />
      </div>
    </section>
  )
}))

export default Main
