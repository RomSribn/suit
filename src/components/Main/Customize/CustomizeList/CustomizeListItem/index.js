import React from 'react'

const CustomizeListItem = (props) => {
  return (
    //TODO Событие onClick на .list_item.radio
    <li className={`list_item radio${props.checked ? ' radio--checked' : ''}`}>
      <div className="radio_indicator"/>
      <div className="radio_name">{props.itemName}</div>
    </li>
  )
};

export default CustomizeListItem;