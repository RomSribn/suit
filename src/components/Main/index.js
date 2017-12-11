import React from 'react'
import { inject, observer } from 'mobx-react'
//Components
import Switch from './Switch'
import Customize from './Customize'
import Dummy from 'Containers/Main/Dummy'
import Controls from './Controls'
import UserMenu from "./UserMenu"
import MYB from './MeasureYourBody'
import LeftPage from './LeftPage'



const Main = inject('garments', 'app')(observer((props) => {
  const { garments, app } = props
  return (
    <section className="main">
      {garments.active && <Switch />}
      <div className="container">
        <div className="left-container">

          <Dummy />
          {garments.isMore && <LeftPage garments={garments} />}
          {garments.measureBody && <MYB garment={garments.active}/> }
          <Controls garments={garments} />
        </div>
        <div className="right-container">
          <Customize />
          {app.showUserMenu && <UserMenu />}
        </div>
      </div>
    </section>
  )
}))

export default Main
