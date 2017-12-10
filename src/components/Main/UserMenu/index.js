import React from 'react'




const Controls = () => {
  return <div className={`controls controls--white`}>
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

const UserMenuBlock = (props) => {
  return <div className="block">
    <h2 className="block_heading">{props.heading}</h2>
    <ul className="block_list">
      <li className="block_list-item">item</li>
      <li className="block_list-item">item</li>
      <li className="block_list-item">item</li>
    </ul>
  </div>
}

const UserMenu = () => {
  // Toggle class '.user-menu--opened' for open menu
  return <div className="user-menu user-menu--opened">
    <div className="pagination-container pagination-top-left">
      <ul className="pagination">
        <li className='page'/>
        <li className='page active'/>
        <li className='page'/>
        <li className='page'/>
        <li className='page'/>
      </ul>
    </div>

    <UserMenuBlock heading={"Dashboard"}/>
    <UserMenuBlock heading={"Settings"}/>
    <UserMenuBlock heading={"Orders history"}/>
    <div className="block">
      <h2 className="block_heading">New order</h2>
      <ul className="block_list">
        <li className="block_list-item list-heading">Make to measure</li>
        <li className="block_list-item">item</li>
        <li className="block_list-item">item</li>
      </ul>
    </div>

    <Controls />

  </div>
}

export default UserMenu