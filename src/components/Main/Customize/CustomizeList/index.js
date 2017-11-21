import React from 'react'
import CustomizeListItem from "./CustomizeListItem"

const CustomizeList = (props) => {
  return (
    <ul className="list">
      <CustomizeListItem itemName={`lorem`} checked/>
      <CustomizeListItem itemName={`lorem`}/>
    </ul>
  )
};

export default CustomizeList;