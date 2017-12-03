import React from 'react'
import { inject, observer } from 'mobx-react'

const Switch = inject('garments', 'app')(observer((props) => {
  const { garments, app } = props
  const section = garments.active.activeGroup.section
  return <div className="controls">
    <div className="mr-switcher">
      {/* Активный {.active}*/}
      <button className="mr-switcher_item active">M</button>
      <span className="mr-switcher_divider"></span>
      <button className="mr-switcher_item">R</button>
    </div>
    <div className="type-switcher">
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
    </div>
    {section === 'design' && <dl className="list">
      {garments.active.groups.map(g => (
        <div key={g.id} className="list_item list_item--active">
          <dt className="list_item-title">
            {g[`title_${app.lang}`]}
          </dt>
          {/* что за данные? */}
          <dd className="list_item-data">данные</dd>
        </div>
      ))}

    </dl>}
  </div>
}))

export default Switch;
