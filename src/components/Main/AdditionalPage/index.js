import React from 'react'
import { observer, inject } from 'mobx-react'
import Pagination from '../Pagination'

const LPBlockListFitting = inject('app')(observer(({garment, app, ...props}) => {
  return <li className="list__item">
    <h3 className="dl-heading">Fitting</h3>
    <dl className="dl-container">
      {garment.fittings.map(f => (
        <div key={f.id} className="dl_item active">
          <dt className="data-title">{f[`title_${app.lang}`]}</dt>
          <dd className="data-definition">{f.value}</dd>
        </div>
      ))}
    </dl>
  </li>
}))

const LPBlockListDesign = inject('app')(observer(({garment, app, ...props}) => {
  return <li className="list__item">
    <h3 className="dl-heading">Design</h3>
    <dl className="dl-container">
      {
        garment.designWithActiveItems.map(g =>
          <div key={g.id} className="dl_item active">
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
    <h3 className="dl-heading">{fabric[`title_${app.lang}`]}</h3>
    <dl className="dl-container">
      <div className="dl_item active">
        <dt className="data-title">Fabric ref</dt>
        <dd className="data-definition">{fabric.activeItem ? fabric.activeItemTitle : '-'}</dd>
      </div>
    </dl>
  </li>
}))

const LPBlock = observer(({garment, app, ...props}) => {
  return <div className="block">
    <h2 className="block_heading">{garment.name}</h2>
    <ul className="content__list">
      {garment.fabric && <LPBlockListFabric garment={garment} />}
      <LPBlockListDesign garment={garment} />
      <LPBlockListFitting garment={garment} />
    </ul>
  </div>
})

const AdditionalPage = ({garments, ...props}) => {
  return <div className='additional-page'>

    <Pagination position='right'/>
    {garments.garmentsWithAcitve.map(g => <LPBlock key={g.name} garment={g}/>)}

  </div>
};

export default observer(AdditionalPage)
