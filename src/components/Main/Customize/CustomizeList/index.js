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
    //console.log('scroll', e.target.scrollTop, e.target.offsetHeight, e.target.scrollHeight)
    if(e.target.scrollTop + e.target.offsetHeight + 10 >= e.target.scrollHeight) {
      group.nextPage()
    }
  }

  componentWillUnmount() {
    this.refs.scroll.removeEventListener('scroll', ::this.onScroll)
  }

  setActiveItem(id) {
    this.props.group.setChecked(id)
  }

  setHovered(id) {
    this.props.group.setHovered(id)
  }

  render () {
    const { group } = this.props
    return <ul className="list" ref="scroll">
      {group && group.items.map(i =>
        <CustomizeListItem
          setHovered={::this.setHovered}
          setChecked={::this.setActiveItem}
          checked={group.activeItem && group.activeItem.id === i.id}
          key={i.id}
          item={i} />
      )}
    </ul>
  }

}

export default CustomizeList
