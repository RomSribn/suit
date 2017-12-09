import React from 'react'
import { inject, observer } from 'mobx-react'
//Components
import Switch from './Switch'
import Customize from './Customize'
import LeftPage from './LeftPage'
import Dummy from 'Containers/Main/Dummy'
import Controls from './Controls'




const Main = inject('garments')(observer((props) => {
  const { garments } = props
  return (
    <section className="main">
      {garments.active && <Switch />}
      <div className="container">
        <div className="dummy-container">
          <LeftPage/>
          {/*<Dummy />*/}
          <Controls garments={garments} />
        </div>
        <Customize />
      </div>
    </section>
  )
}))

export default Main
