import React from 'react'
import { inject, observer } from 'mobx-react'
import Transition from 'react-transition-group/Transition';
//Components
import Switch from './Switch'
import Customize from './Customize'
import Dummy from 'Containers/Main/Dummy'
import Controls from './Controls'
import UserMenu from "./UserMenu"
import MYB from './MeasureYourBody'
import AdditionalPage from './AdditionalPage'
import LearnWear from './LearnWear'
import SettingsMeasures from './UserMenu/Settings/Measures'
import UserInfo from './UserInfo'

const Main = inject('garments', 'app')(observer((props) => {
  const { garments, app } = props
  return (
    <section className="main">
      <Transition in={garments.active && !app.isAnyPopup} timeout={300}>
        {(state) => (<Switch state={state} />)}
      </Transition>
      <div className="container">
        <div className="left-container">
          <Dummy />
          {app.isMore && <AdditionalPage garments={garments} />}
          {app.measureBody && <MYB garment={garments.active}/> }
          {true && <UserInfo/>}
          <Controls garments={garments} />
        </div>
        <div className="right-container">
          <Customize />
          {app.measureBody && <SettingsMeasures garment={garments.active}/>}
          {app.showUserMenu && <UserMenu />}
          {app.measureBody && <LearnWear />}
        </div>
      </div>
    </section>
  )
}))

export default Main
