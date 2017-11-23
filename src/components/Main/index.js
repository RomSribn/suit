import React from 'react'
//Components
import Switch from './Switch'
import Customize from './Customize'
import Dummy from '../../containers/Main/Dummy'

import Question from 'Assets/images/svg/question.svg'
import Show from 'Assets/images/svg/show.svg'
import More from 'Assets/images/svg/more.svg'

const Main = (props) => {

  return (
    <section className="main">
      <Switch />
      <div className="container">
        <div className="dummy-container">
          <Dummy />
          <div className="controls">
            <div className="circle left"><img src={Question} alt=""/></div>
            <div className="circle center"><img src={Show} alt=""/></div>
            <div className="circle right"><img src={More} alt=""/></div>
          </div>
        </div>
        <Customize />
      </div>
    </section>
  )
};

export default Main
