import React from 'react'
import Pagination from '../Pagination'

const LPBlockListItem = props => {
  return <li className="list__item">
    <h3 className="dl-heading">{props.heading}</h3>
    <dl className="dl-container">
      {/* .map method here .dl_item */}
      <div className="dl_item active"> {/*активный элемент*/}
        <dt className="data-title">parameter</dt>
        <dd className="data-definition">value</dd>
      </div>
    </dl>
  </li>
};

const LPBlock = props => {
  return <div className="block">
    <h2 className="block_heading">{props.heading}</h2>
    <ul className="content__list">
      {/* тут .map метод, внизу рыба */}
      <LPBlockListItem heading={'Fabric'} /*и сюда же передаем элементы принадлежащие Fabric */ />
      <LPBlockListItem heading={'Design'} /*и сюда же передаем элементы принадлежащие Design */ />
      <LPBlockListItem heading={'Fittings'} /*и сюда же передаем элементы принадлежащие Fittings */ />
    </ul>
  </div>

};

const AdditionalPage = () => {
  return <div className='additional-page'>

    <Pagination position='right'/>

    <LPBlock heading={'Jacket'}/>
    <LPBlock heading={'Trousers'}/>
    <LPBlock heading={'Shirt'}/>
    <LPBlock heading={'Waistcoat'}/>
    <LPBlock heading={'Coat'}/>
    <LPBlock heading={'Shoes'}/>

  </div>
};

export default AdditionalPage