import React from 'react'
import LeftArrow from 'Assets/images/svg/left-arrow.svg'
import RightArrow from 'Assets/images/svg/right-arrow.svg'
import Save from 'Assets/images/svg/save.svg'

const CustomizeControls = (props) => {
  return (
    <div className="controls">
      <div className="circle left"><img src={LeftArrow} alt=""/></div>
      <div className="circle save"><img src={Save} alt=""/></div>
      <div className="circle right"><img src={RightArrow} alt=""/></div>
    </div>
  )
};

export default CustomizeControls