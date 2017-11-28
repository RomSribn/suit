import React from 'react'

import CustomizeListItem from '../CustomizeList/CustomizeListItem'

const CustomizeDesign = () => {
  //TODO Реакция на нажатие двойной стрелки
  return (
    <ul className="list">
      <li className="list_item list_item--opened">
        <header className="list_header">
          <span className="list__header_heading">Название опции</span>
          <span className="list__header_icons"><i className="fa fa-eye"/><i className="fa fa-angle-double-up"/></span>
        </header>
        <ul className="list">
          <CustomizeListItem itemName={'text'} checked/>
          <CustomizeListItem itemName={'text'}/>
        </ul>
      </li>
    </ul>
  )
}

export default CustomizeDesign