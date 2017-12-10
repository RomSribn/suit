import React from 'react'


const LPBlockListItem = props => {
  return <li className="list__item">
    <h3 className="list__item-heading">{props.heading}</h3>
    <dl className="list__item-container">
      {/* .map method here */}
      <div className="list__item-container_content active"> {/*активный элемент*/}
        <dt className="data-title">parameter</dt>
        <dd className="data-definition">value</dd>
      </div>
      <div className="list__item-container_content">
        <dt className="data-title">parameter</dt>
        <dd className="data-definition">value</dd>
      </div>
      <div className="list__item-container_content">
        <dt className="data-title">parameter</dt>
        <dd className="data-definition">value</dd>
      </div>
    </dl>
  </li>
};

const LPBlock = props => {
  return <div className="lp-block">
    <h2 className="lp-block_heading">{props.heading}</h2>
    <ul className="content__list">
      {/* тут .map метод, внизу рыба */}
      <LPBlockListItem heading={'Fabric'} /*и сюда же передаем элементы принадлежащие Fabric */ />
      <LPBlockListItem heading={'Design'} /*и сюда же передаем элементы принадлежащие Design */ />
      <LPBlockListItem heading={'Fittings'} /*и сюда же передаем элементы принадлежащие Fittings */ />
    </ul>
  </div>

};

const Pagination = () => {
  return <div className="pagination-container pagination-top-right">
    <ul className="pagination">
      <li className='page'/>
      <li className='page active'/>
      <li className='page'/>
      <li className='page'/>
      <li className='page'/>
    </ul>
  </div>
};

const LeftPage = () => {
  return <div className='left-page'>

    <Pagination/>

    <LPBlock heading={'Jacket'}/>
    <LPBlock heading={'Trousers'}/>
    <LPBlock heading={'Shirt'}/>
    <LPBlock heading={'Waistcoat'}/>
    <LPBlock heading={'Coat'}/>
    <LPBlock heading={'Shoes'}/>

  </div>
};

export default LeftPage