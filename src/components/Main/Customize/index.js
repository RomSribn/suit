import React from 'react'
import CustomizeList from './CustomizeList'
import OrderData from './CustomizeOrderData'
import Search from './Search'
import CustomizeControls from './CustomizeControls'

const Customize = () => {
  return (
    <div className="customize"
         style={{background: "url('https://www.pixelstalk.net/wp-content/uploads/2016/10/Cloth-Wallpapers-HD.jpg'"}}>
      <div className="customize__controls">

        <OrderData/>
        <div className="search">
          <Search/>
        </div>

        <div className="list-container">
          <CustomizeList/>
        </div>

        <CustomizeControls />

      </div>
    </div>
  )
};

export default Customize;
