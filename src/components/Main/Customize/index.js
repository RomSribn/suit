import React from 'react'
import CustomizeList from "./CustomizeList";
import OrderData from './CustomizeOrderData'
import Search from './Search'

const Customize = () => {
  return (
    <div className="customize"
         style={{background: "url('http://www.discovertextures.com/wp-content/uploads/2015/10/textile-texture0025-e1445254668459.jpg'"}}>
      <div className="customize__controls">

        <OrderData/>
        <div className="search">
          <Search/>
        </div>

        <div className="list-container">
          <CustomizeList/>
        </div>

        <div className="controls">
          <img
            src="http://via.placeholder.com/26/ffffff "
            alt="Show order date"/>
          <img
            src="http://via.placeholder.com/26/ffffff"
            alt="Show order date"/>
          <img
            src="http://via.placeholder.com/26/ffffff "
            alt="Show order date"/>
        </div>

      </div>
    </div>
  )
};

export default Customize;