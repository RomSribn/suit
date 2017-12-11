import React from 'react'
import { inject, observer } from 'mobx-react'
//Components
import Switch from './Switch'
import Customize from './Customize'
import LeftPage from './LeftPage'
import Dummy from 'Containers/Main/Dummy'
import Controls from './Controls'
import UserMenu from "./UserMenu";




const Main = inject('garments')(observer((props) => {
  const { garments } = props
  return (
    <section className="main">
      {garments.active && <Switch />}
      <div className="container">
        <div className="left-container">
          <Dummy />
          {garments.isMore && <LeftPage garments={garments} />}
          <Controls garments={garments} />
        </div>
        <div className="right-container">
          <Customize />
          {/*<UserMenu />*/}
        </div>
      </div>
    </section>
  )
}))

export default Main
