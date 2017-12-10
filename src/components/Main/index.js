import React from 'react'
import { inject, observer } from 'mobx-react'
//Components
import Switch from './Switch'
import Customize from './Customize'
import AdditionalPage from './AdditionalPage'
import Dummy from 'Containers/Main/Dummy'
import Controls from './Controls'
import UserMenu from "./UserMenu"
import MYB from './MeasureYourBody'




const Main = inject('garments')(observer((props) => {
  const { garments } = props
  return (
    <section className="main">
      {garments.active && <Switch />}
      <div className="container">
        <div className="left-container">
          {/*<Dummy />*/}
          {/*<AdditionalPage />*/}
          <MYB />
          <Controls garments={garments} />
        </div>
        <div className="right-container">
          <Customize />
          <UserMenu />
        </div>
      </div>
    </section>
  )
}))

export default Main
