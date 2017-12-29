import React, { Component } from 'react'
import { inject, observer } from 'mobx-react'
import cx from 'classnames'
import CustomizeListItem from '../CustomizeList/CustomizeListItem'

class CustomizeDesignListItem extends Component {

  clickHandle() {
    const { garment, group } = this.props
    garment.setActiveGroup(group.id)
  }

  setActiveItem(id) {
    this.props.group.setChecked(id)
  }

  setHovered(id) {
    this.props.group.setHovered(id)
  }

  render() {
    const { group, app, garment } = this.props
    const listClass = cx('list_item',
      {'list_item--opened': garment.activeGroup.id === group.id}
    )

    return <li className={listClass} onClick={::this.clickHandle}>
      <header className="list_header">
        <span className="list__header_heading">{group[`title_${app.lang}`]}</span>
        {/*<span className="list__header_icons">*/}
          {/*<i className="fa fa-eye"/> /!* Переключение видимости элемента одежды на манекене *!/*/}
          {/*<i className="fa fa-angle-double-up"/>*/}
        {/*</span>*/}
      </header>
      <ul className="list">
        {group.list.map(i => <CustomizeListItem
          setHovered={::this.setHovered}
          setChecked={::this.setActiveItem}
          checked={group.activeItem && group.activeItem.id === i.id}
          item={i}
          key={i.id}/>)}
      </ul>
    </li>
  }
}

export default inject('app')(observer(CustomizeDesignListItem))
