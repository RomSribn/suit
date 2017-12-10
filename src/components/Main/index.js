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
<<<<<<< HEAD
        <div className="dummy-container">
          {/*<LeftPage/>*/}
          <Dummy />
=======
        <div className="left-container">
          <Dummy />
          <LeftPage />
>>>>>>> 252f7c10a490047b448ae9fe3c75c611d9fcc4b5
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
