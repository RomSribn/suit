import React from 'react'

const Switch = () => {
  return (
    <div className="controls">
      <div className="mr-switcher">
        <button className="mr-switcher_item active">M</button>
        <span className="mr-switcher_divider"></span>
        <button className="mr-switcher_item">R</button>
      </div>
      <div className="type-switcher">
        <button className="type-switcher_item active">Ткань</button>
        <button className="type-switcher_item">Дизайн</button>
        <button className="type-switcher_item">Мерки</button>
      </div>
    </div>
  )
};

export default Switch;