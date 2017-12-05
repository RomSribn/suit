import React from 'react'
import { observer } from 'mobx-react'
import { find } from 'lodash'

const ActiveFabric = observer(({garments, ...props}) => {
  let src = 'http://www.fudgegraphics.com/downloads/fabric/fudgegraphics-creased-fabric-10.jpg'
  if(garments.active && garments.active.activeGroup
    && garments.active.activeGroup.section === 'fabric') {
    let fabric = find(garments.active.activeGroup.items, {checked: true})
    src = fabric ? fabric.image_url_2d : 'http://www.fudgegraphics.com/downloads/fabric/fudgegraphics-creased-fabric-10.jpg'
  }
  return src ? <img
    alt=""
    src={src}
    className="customize__image customize__image--cloth"
  /> : null
})

export default ActiveFabric
