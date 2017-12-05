import React from 'react'
import { inject, observer } from 'mobx-react'

const MenuItem = inject('app')(observer(({group, garments, app, ...props}) => {
  const g = group
  return <div
    className={`list_item ${g.id === garments.active.activeGroup.id && 'list_item--active'}`}> {/* list_item--active для активного элемента*/}
    <dt onClick={() => garments.active.setActiveGroup(g.id)} className="list_item-title">
      {g[`title_${app.lang}`]}
    </dt>
    <dd className="list_item-data">{g.activeItem}</dd>
  </div>
}))

const Switch = inject('garments')(observer((props) => {
  const { garments } = props
  const section = garments.active.activeGroup ? garments.active.activeGroup.section : null
  return <div className="switcher">
    {!garments.isMore && <div className="mr-switcher">
      <button className="mr-switcher_item active">M</button>
      <span className="mr-switcher_divider"></span>
      <button className="mr-switcher_item">R</button>
    </div>}
    {!garments.isMore && <div className="type-switcher">
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
    {garments.isMore && <dl className="list">
      {garments.active.groups.map(g => (
        <MenuItem key={g.id} group={g} garments={garments} />
      ))}

    </dl>}
  </div>
}))

export default Switch;
