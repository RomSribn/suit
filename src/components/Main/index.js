import React from 'react'
//Components
import Switch from './Switch'
import Customize from './Customize'
import Dummy from 'Containers/Main/Dummy'
import Controls from 'Containers/Main/Controls'
import Login from 'Containers/Main/Login'

import Question from 'Assets/images/svg/question.svg'
import Show from 'Assets/images/svg/show.svg'
import More from 'Assets/images/svg/more.svg'

const Main = (props) => {

  return (
    <section className="main">
      {/*<Login />*/}
      <Switch />
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
};

export default Main
