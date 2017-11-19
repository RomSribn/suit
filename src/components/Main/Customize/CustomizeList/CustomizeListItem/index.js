import React from 'react'

const CustomizeListItem = (props) => {
  return (
    <li className={`list_item${props.checked ? ' checked' : ''}`}>
      <div className="indicator"></div>
      <div className="name">{props.itemName}</div>
    </li>
  )
};

export default CustomizeListItem;