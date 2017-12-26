import React, { Component } from 'react'
import { observer } from 'mobx-react'
import CustomizeListItem from "./CustomizeListItem"

@observer
class CustomizeList extends Component {

  componentDidMount() {
    this.refs.scroll.addEventListener('scroll', ::this.onScroll)
  }

  onScroll(e) {
    const { group } = this.props
    if(e.target.scrollTop + e.target.offsetHeight >= e.target.scrollHeight) {
      group.nextPage()
    }
  }

  componentWillUnmount() {
    this.refs.scroll.removeEventListener('scroll', ::this.onScroll)
  }

  setActiveItem(id) {
    this.props.group.setChecked(id)
  }

  render () {
    const { group } = this.props
    return <ul className="list" ref="scroll">
      {group && group.items.map(i =>
        <CustomizeListItem
          setChecked={::this.setActiveItem}
          checked={group.activeItem && group.activeItem.id === i.id}
          key={i.id}
          item={i} />
      )}
    </ul>
  }

}

export default CustomizeList
