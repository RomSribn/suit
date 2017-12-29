import React, { } from 'react'
import { observer, inject } from 'mobx-react'

const CustomizeListItem = inject('app')(observer(({item, app, ...props}) => {
  return <li
    onClick={e => props.setChecked(item.id)}
    onMouseEnter={e => props.setHovered(item.id)}
    className={`list_item radio${item.checked ? ' radio--checked' : ''}`}>
    <div className="radio_indicator"/>
    <div className="radio_name">
    {/*item[`title_${app.lang}`] ? item[`title_${app.lang}`] : item.code*/}
    {item.code ? item.code : item[`title_${app.lang}`]}
    </div>
  </li>
}))

export default CustomizeListItem
