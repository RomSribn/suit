import React from 'react'
import Pagination from '../Pagination'

const Controls = () => {
  return <div className={`controls controls--gray`}>
    <div className="circle left">
      {/*<img src='https://image.flaticon.com/icons/svg/17/17214.svg' alt=""/>*/}
      <span className="text">Где заказ?</span>
    </div>
    <div className="circle center">
      {/*<img src='https://png.icons8.com/metro/540/phone.png' alt=""/>*/}
      <span className="text">Звонок стилиста</span>
    </div>
    <div className="circle right">
      {/*<img src='http://icons.iconarchive.com/icons/icons8/ios7/512/Ecommerce-Shopping-Bag-icon.png' alt=""/>*/}
      <span className="text">В корзину</span>
    </div>
  </div>
};

const UserMenuBlockItem = (props) => {
  return <li className={`block_list-item${props.isHeading ? ' list-heading' : ''}`}>
    {props.text}
  </li>
}

const UserMenuBlock = (props) => {
  return <div className="block">
    <h2 className="block_heading">{props.heading}</h2>
    <ul className="block_list">
      <UserMenuBlockItem isHeading={true} text="item"/>
      <UserMenuBlockItem text="item"/>
      <UserMenuBlockItem text="item"/>
      <UserMenuBlockItem text="item"/>
    </ul>
  </div>
}

const UserMenu = () => {
  // Toggle class '.user-menu--opened' for open menu
  return <div className="user-menu user-menu--opened">

    <Pagination position="left"/>

    <UserMenuBlock heading={"Dashboard"}/>
    <UserMenuBlock heading={"Settings"}/>
    <UserMenuBlock heading={"Orders history"}/>

    <Controls/>

  </div>
}

export default UserMenu