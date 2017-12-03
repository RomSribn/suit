import React from 'react'
import { observer } from 'mobx-react'
import { find } from 'lodash'

const ActiveImg = observer(({garments, ...props}) => {
  let src = null
  if(garments.active && garments.active.activeGroup
    && garments.active.activeGroup.section !== 'fabric') {
    let fabric = find(garments.active.activeGroup.items, {checked: true})
    src = fabric ? fabric.image_url_2d : null
  }
  return src ? <img
    alt=""
    src={src}
    className="customize__image customize__image--wear"
  /> : null
})

export default ActiveImg
