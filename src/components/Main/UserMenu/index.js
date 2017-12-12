import React, { Component } from 'react'
import { inject, observer } from 'mobx-react'
import Pagination from '../Pagination'

import Settings from 'Assets/images/svg/settings.svg'
import Phone from 'Assets/images/svg/phone.svg'
import Cart from 'Assets/images/svg/cart.svg'

const Controls = () => {
  return <div className={`controls controls--gray`}>
    <div className="circle left">
      <img src={Settings} alt=""/>
      <span className="text">Где заказ?</span>
    </div>
    <div className="circle center">
      <img src={Phone} alt=""/>
      <span className="text">Звонок стилиста</span>
    </div>
    <div className="circle right">
      <img src={Cart} alt=""/>
      <span className="text">В корзину</span>
    </div>
  </div>
}

@inject('user', 'garments', 'app') @observer
class UserMenu extends Component {
  garmentClick(garment) {
    const { garments, app } = this.props
    garments.setGarment(garment)
    app.showUserMenu = false
  }

  render() {
    const { user } = this.props
    // Toggle class '.user-menu--opened' for open menu
    return <div className="user-menu user-menu--opened">

      <Pagination position="left"/>

      <div className="block">
        <h2 className="block_heading">Dashboard</h2>
        <ul className="block_list">
          <li className="block_list-item">News</li>
          <li className="block_list-item">Last order</li>
          <li className="block_list-item">Saved orders</li>
        </ul>
      </div>
      <div className="block">
        <h2 className="block_heading">Settings</h2>
        <ul className="block_list">
          <li className="block_list-item">My profile</li>
          <li className="block_list-item">Payments</li>
          <li className="block_list-item">Language</li>
          <li className="block_list-item" onClick={e => user.logout()}>Sign out</li>
        </ul>
      </div>
      <div className="block">
        <h2 className="block_heading">Orders history</h2>
        <ul className="block_list">
          <li className="block_list-item">Saved</li>
          <li className="block_list-item">Last month</li>
          <li className="block_list-item">Last year</li>
        </ul>
      </div>
      <div className="block">
        <h2 className="block_heading">New order</h2>
        <ul className="block_list">
          <li className="block_list-item list-heading">Make to measure</li>
          <li className="block_list-item" onClick={e => this.garmentClick('jacket')}>Jacket</li>
          <li className="block_list-item" onClick={e => this.garmentClick('shirt')}>Shirt</li>
          <li className="block_list-item list-heading">Ready to wear</li>
          <li className="block_list-item">Shirt</li>
          <li className="block_list-item">Shoes</li>
          <li className="block_list-item">Tie</li>
        </ul>
      </div>

      <Controls/>

    </div>
  }
}

export default UserMenu
