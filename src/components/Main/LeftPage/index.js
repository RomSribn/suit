import React from 'react'
import { observer, inject } from 'mobx-react'


const LPBlockListFitting = inject('app')(observer(({garment, app, ...props}) => {
  return <li className="list__item">
    <h3 className="list__item-heading">Fitting</h3>
    <dl className="list__item-container">
      {garment.fittings.map(f => (
        <div key={f.id} className="list__item-container_content active">
          <dt className="data-title">{f[`title_${app.lang}`]}</dt>
          <dd className="data-definition">{f.value}</dd>
        </div>
      ))}
    </dl>
  </li>
}))

const LPBlockListDesign = inject('app')(observer(({garment, app, ...props}) => {
  return <li className="list__item">
    <h3 className="list__item-heading">Design</h3>
    <dl className="list__item-container">
      {
        garment.designWithActiveItems.map(g =>
          <div key={g.id} className="list__item-container_content active">
            <dt className="data-title">{g[`title_${app.lang}`]}</dt>
            <dd className="data-definition">{g.activeItem[`title_${app.lang}`]}</dd>
          </div>
        )
      }
    </dl>
  </li>
}))

const  LPBlockListFabric = inject('app')(observer(({garment, app, ...props}) => {
  const fabric = garment.fabric
  return <li className="list__item">
    <h3 className="list__item-heading">{fabric[`title_${app.lang}`]}</h3>
    <dl className="list__item-container">
      <div className="list__item-container_content active">
        <span className="data-title">Fabric ref</span>
        <dd className="data-definition">{fabric.activeItem ? fabric.activeItemTitle : '-'}</dd>
      </div>
    </dl>
  </li>
}))

const LPBlock = observer(({garment, app, ...props}) => {
  return <div className="lp-block">
    <h2 className="lp-block_heading">{garment.name}</h2>
    <ul className="content__list">
      {garment.fabric && <LPBlockListFabric garment={garment} />}
      <LPBlockListDesign garment={garment} />
      <LPBlockListFitting garment={garment} />
    </ul>
  </div>
})

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

const LeftPage = ({garments, ...props}) => {
  return <div className='additional-page'>

    <Pagination/>
    {garments.garmentsWithAcitve.map(g => <LPBlock key={g.name} garment={g}/>)}

  </div>
};

export default observer(LeftPage)
