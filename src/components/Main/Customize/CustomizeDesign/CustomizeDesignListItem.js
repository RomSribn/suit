import React from 'react'
import CustomizeListItem from '../CustomizeList/CustomizeListItem'

const CustomizeDesignListItem = (props) => {
  return (
    <li className="list_item"> {/* (1) */}
      <header className="list_header">
        <span className="list__header_heading">{props.heading}</span>
        <span className="list__header_icons">
          <i className="fa fa-eye"/> {/* Переключение видимости элемента одежды на манекене */}
          <i
            className="fa fa-angle-double-up"/> {/* TODO Добавить событие onClick - переключать класс list_item--opened к (1) */}
        </span>
      </header>
      <ul className="list">
        {
          props.items.map((item, key) => {
            return <CustomizeListItem itemName={item} key={key}/>
          })
        }
      </ul>
    </li>
  )
};

export default CustomizeDesignListItem;