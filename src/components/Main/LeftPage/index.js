import React from 'react'

let LPBlockItems = [
  'first lorem ipsum item',
  'second ipsum item',
  'third lorem item',
];

const LPBlockListItem = props => {
  return <li className="list__item">
    <h3 className="list__item-heading">{props.heading}</h3>
    <ul className="list__item-container">
      {
        LPBlockItems.map((item, idx) => {
          return <li key={idx} className="list__item-container_content">{item}</li>
        })
      }
    </ul>
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
  return <ul className="pagination">
    <li className='page'/>
    <li className='item active'/>
    <li className='page'/>
    <li className='page'/>
    <li className='page'/>
  </ul>
};

const LeftPage = () => {
  return <div className='left-page'>

    <Pagination />

    <LPBlock heading={'Jacket'}/>
    <LPBlock heading={'Trousers'}/>
    <LPBlock heading={'Shirt'}/>
    <LPBlock heading={'Waistcoat'}/>
    <LPBlock heading={'Coat'}/>
    <LPBlock heading={'Shoes'}/>

  </div>
};

export default LeftPage