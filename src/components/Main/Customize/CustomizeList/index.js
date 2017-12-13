import React, { Component } from 'react'
import { observer } from 'mobx-react'
import CustomizeListItem from "./CustomizeListItem"

@observer
class CustomizeList extends Component {

  setActiveItem(id) {
    this.props.group.setChecked(id)
  }

  render () {
    const { group } = this.props
    return <ul className="list">
      {group && group.items.map(i =>
        <CustomizeListItem
          setChecked={::this.setActiveItem}
          checked={group.activeItem && group.activeItem.id === i.id}
          key={i.id}
          item={i} />
      )}
      {group.isMoreData && <button onClick={group.nextPage} className="items-loading">Загрузить еще</button>}
    </ul>
  }

}

export default CustomizeList
