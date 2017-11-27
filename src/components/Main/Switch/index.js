import React from 'react'

const Switch = () => {
  return (
    <div className="controls">
      <div className="mr-switcher">
        {/* Активный {.active}*/}
        <button className="mr-switcher_item active">M</button>
        <span className="mr-switcher_divider"></span>
        <button className="mr-switcher_item">R</button>
      </div>
      <div className="type-switcher">
        {/* Активный {.active}*/}
        <button className="type-switcher_item active">Ткань</button>
        <button className="type-switcher_item">Дизайн</button>
        <button className="type-switcher_item">Мерки</button>
      </div>
      {/* Скрыт {.disabled} */}
      <dl className="list disabled">
        {/* Активный {.list_item--active}*/}
        <div className="list_item list_item--active">
          <dt className="list_item-title">Название</dt>
          <dd className="list_item-data">данные</dd>
        </div>
        <div className="list_item">
          <dt className="list_item-title">Название</dt>
          <dd className="list_item-data">данные</dd>
        </div>
        <div className="list_item">
          <dt className="list_item-title">Название</dt>
          <dd className="list_item-data">данные</dd>
        </div>
        <div className="list_item">
          <dt className="list_item-title">Название</dt>
          <dd className="list_item-data">данные</dd>
        </div>
        <div className="list_item">
          <dt className="list_item-title">Название</dt>
          <dd className="list_item-data">данные</dd>
        </div>
      </dl>
    </div>
  )
};

export default Switch;