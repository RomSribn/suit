import React from 'react'
import { observer } from 'mobx-react'
import CustomizeDesignListItem from "./CustomizeDesignListItem"

const CustomizeDesign = ({garment, ...props}) => {
  return (
    <ul className="list">
      {
        garment.designGroups.map(g => (
          <CustomizeDesignListItem garment={garment} key={g.id} group={g}/>
        ))
      }
    </ul>
  )
}

export default observer(CustomizeDesign)
