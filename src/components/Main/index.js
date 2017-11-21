import React from 'react'
//Components
import Switch from './Switch'
import Customize from './Customize'
import Dummy from '../../containers/Main/Dummy'

const Main = (props) => {

  return (
    <section className="main">
      <Switch />
      <div className="container">
        <Dummy />
        <Customize />
      </div>
    </section>
  )
};

export default Main
