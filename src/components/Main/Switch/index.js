import React from 'react'
import { inject, observer } from 'mobx-react'

const Switch = inject('garments', 'app')(observer(({garments, app}) => {
  const section = garments.active.activeGroup ? garments.active.section : null
  return <div className="switcher">
    {!app.isMore && <div className="mr-switcher">
      <button className="mr-switcher_item active">M</button>
      <span className="mr-switcher_divider"></span>
      <button className="mr-switcher_item">R</button>
    </div>}
    {!app.isMore && <div className="type-switcher">
      <button
        onClick={() => garments.active.setActiveSection('fabric')}
        className={`type-switcher_item ${section === 'fabric' ? 'active' : ''}`}>
        Ткань
      </button>
      <button
        onClick={() => garments.active.setActiveSection('design')}
        className={`type-switcher_item ${section === 'design' ? 'active' : ''}`}>
        Дизайн
      </button>
      <button
        onClick={() => garments.active.setActiveSection('fitting')}
        className={`type-switcher_item ${section === 'fitting' ? 'active' : ''}`}>
        Мерки
      </button>
    </div>}
  </div>
}))

export default Switch;
