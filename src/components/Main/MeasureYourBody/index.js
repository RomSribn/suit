import React from 'react'
import {} from 'react'
import Pagination from "../Pagination";

const MYBRow = (props) => {
  return <div className="myb-category">
    <label className="myb_label">{props.heading}</label>
    <div className="myb_input-block">
      <input type="text" className="myb_input"/>
      <span className="myb_system">см</span>
    </div>
  </div>
}

const MYB = () => {
  return [
    <Pagination position="right"/>,
    <section className="myb">
    <div className="myb-container">
      <h2 className="heading">Measure your body</h2>
      <div className="myb-rows">
        <MYBRow heading="Размер воротника"/>
        <MYBRow heading="Обхват груди"/>
        <MYBRow heading="Обхват талии"/>
        <MYBRow heading="Левый рукав"/>
        <MYBRow heading="Правый рукав"/>
        <MYBRow heading="Правый рукав"/>
        <MYBRow heading="Правый рукав"/>
        <MYBRow heading="Правый рукав"/>
        <MYBRow heading="Правый рукав"/>
        <MYBRow heading="Правый рукав"/>
        <MYBRow heading="Правый рукав"/>
        <MYBRow heading="Правый рукав"/>
        <MYBRow heading="Правый рукав"/>
        <MYBRow heading="Правый рукав"/>
      </div>
    </div>
  </section>
  ]
}

export default MYB