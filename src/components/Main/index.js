import React from 'react'
import { inject, observer } from 'mobx-react'
//Components
import Switch from './Switch'
import Customize from './Customize'
import Dummy from 'Containers/Main/Dummy'
import Controls from './Controls'
import UserMenu from "./UserMenu"
import MYB from './MeasureYourBody'
import AdditionalPage from './AdditionalPage'
import LearnWear from './LearnWear'

const Main = inject('garments', 'app')(observer((props) => {
  const { garments, app } = props
  return (
    <section className="main">
      {garments.active && !app.isAnyPopup && <Switch />}
      <div className="container">
        <div className="left-container">

          <Dummy />
          {app.isMore && <AdditionalPage garments={garments} />}
          {app.measureBody && <MYB garment={garments.active}/> }
          <Controls garments={garments} />
        </div>
        <div className="right-container">
          <Customize />
          {app.showUserMenu && <UserMenu />}
          {app.measureBody && <LearnWear />}
        </div>
      </div>
    </section>
  )
}))

export default Main
