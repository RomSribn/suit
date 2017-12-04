import React from 'react'
import { inject, observer } from 'mobx-react'

const Switch = inject('garments', 'app')(observer((props) => {
  const { garments, app } = props
  const section = garments.active.activeGroup.section
  return <div className="switcher">
    {/* Скрывать блок M|R (mr-switcher) при выборе секции design*/}
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
        <div key={g.id} className="list_item"> {/* list_item--active для активного элемента*/}
          <dt className="list_item-title">
            {g[`title_${app.lang}`]}
          </dt>
          {/* что за данные? */}
          {/* это текст после двоеточия на макетах, я так понял там разные данные для каждого параметра */}
          <dd className="list_item-data">данные</dd>
        </div>
      ))}

    </dl>}
  </div>
}))

export default Switch;
