import React from 'react'
import { inject, observer } from 'mobx-react'

const CustomizeFitting = ({garments, ...props}) => {
  return <ul className="list">
    <li className="list_item list_item--opened" >
      <header className="list_header">
        <span
          onClick={e => garments.measureBody = !garments.measureBody}
          className="list__header_heading">
          Measure your body
        </span>
        <span className="fa fa-angle-right"></span>
      </header>
    </li>
    <li className="list_item" >
      <header className="list_header">
        <span className="list__header_heading">Measure your shirt</span>
        <span className="fa fa-angle-right"></span>
      </header>
    </li>
    <li className="list_item" >
      <header className="list_header">
        <span className="list__header_heading">Use my last fitting</span>
        <span className="fa fa-angle-right"></span>
      </header>
    </li>
    <li className="list_item" >
      <header className="list_header">
        <span className="list__header_heading">Home tailor</span>
        <span className="fa fa-angle-right"></span>
      </header>
    </li>
  </ul>
}

export default inject('garments')(observer(CustomizeFitting))
