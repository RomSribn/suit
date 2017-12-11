import React from 'react'
import { observer } from 'mobx-react'

const ActiveImg = observer(({garments, ...props}) => {
  let src = null
  if(garments.active && garments.active.activeGroup
    && garments.active.section !== 'fabric') {
    let fabric = garments.active.activeGroup.activeItem
    src = fabric ? fabric.image_url_2d : null
  }
  console.log(src)
  return src ? <img
    alt=""
    src={src}
    className="customize__image customize__image--wear"
  /> : null
})

export default ActiveImg
