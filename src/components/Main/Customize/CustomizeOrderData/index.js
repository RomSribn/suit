import React from 'react'
import Currency from 'Assets/images/svg/currency.svg'
import Date from 'Assets/images/svg/date.svg'

const OrderData = () => {
  return (
    <div className="order-data">
      <div className="order-data_currency">
        <img src={Currency} alt="Show price"/></div>
      <div className="order-data_date">
        <img src={Date} alt="Show order date"/></div>
      <div className="order-data_value">128000.00</div>
    </div>
  )
};

export default OrderData;