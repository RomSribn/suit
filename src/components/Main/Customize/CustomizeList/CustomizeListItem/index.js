import React from 'react'

const CustomizeListItem = (props) => {
  return (
    //TODO Реакция на нажатие радио-кнопки
    <li className={`list_item radio${props.checked ? ' radio--checked' : ''}`}>
      <div className="radio_indicator"></div>
      <div className="radio_name">{props.itemName}</div>
    </li>
  )
};

export default CustomizeListItem;