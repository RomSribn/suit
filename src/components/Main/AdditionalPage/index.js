import React, { Component } from 'react'
import { observer, inject } from 'mobx-react'
import Pagination from '../Pagination'

@inject('app', 'garments') @observer
class LPBlockListFitting extends Component {
  clickHeader() {
    const { garment, garments, app } = this.props
    garments.setGarment(garment.name)
    garment.setActiveSection('fitting')
    app.measureBody = true
  }

  clickHandle(fitting) {
    const { garment, garments, app } = this.props
    garments.setGarment(garment.name)
    garment.setActiveSection('fitting')
    garment.activeFitting = fitting
    app.measureBody = true
  }

  render() {
    const { garment, app } = this.props
    return <li className="list__item">
      <h3 className="dl-heading" onClick={::this.clickHeader}>Fitting</h3>
      <dl className="dl-container">
        {garment.fittings.map(f => (
          <div key={f.id} className="dl_item" onClick={e => this.clickHandle(f)}>
            <dt className="data-title">{f[`title_${app.lang}`]}</dt>
            <dd className="data-definition">{f.value}</dd>
          </div>
        ))}
      </dl>
    </li>
  }
}

@inject('app', 'garments') @observer
class LPBlockListDesign extends Component {
  clickHandle(group) {
    const { garment, garments } = this.props
    garments.setGarment(garment.name)
    garment.setActiveSection('design')
    garment.setActiveGroup(group.id)
  }

  render() {
    const { garment, app } = this.props
    return <li className="list__item">
      <h3 className="dl-heading">Design</h3>
      <dl className="dl-container">
        {
          garment.designWithActiveItems.map(g =>
            <div key={g.id} className="dl_item" onClick={e => this.clickHandle(g)}>
              <dt className="data-title">{g[`title_${app.lang}`]}</dt>
              <dd className="data-definition">{g.activeItem[`title_${app.lang}`]}</dd>
            </div>
          )
        }
      </dl>
    </li>
  }
}

@inject('app', 'garments') @observer
class  LPBlockListFabric extends Component {
  clickHandle() {
    const { garment, garments } = this.props
    garments.setGarment(garment.name)
    garment.setActiveSection('fabric')
  }

  render() {
    const { garment, app } = this.props
    const fabric = garment.fabric
    return <li className="list__item">
      <h3 className="dl-heading" onClick={::this.clickHandle}>{fabric[`title_${app.lang}`]}</h3>
      <dl className="dl-container">
        <div className="dl_item" onClick={::this.clickHandle}>
          <dt className="data-title">Fabric ref</dt>
          <dd className="data-definition">{fabric.activeItem ? fabric.activeItemTitle : '-'}</dd>
        </div>
      </dl>
    </li>
  }
}

const LPBlock = inject('garments')(observer(({garments, garment, app, ...props}) => {
  return <div className="block">
    <h2 className="block_heading" onClick={e => garments.setGarment(garment.name)}>{garment.name}</h2>
    <ul className="content__list">
      {garment.fabric && <LPBlockListFabric garment={garment} />}
      <LPBlockListDesign garment={garment} />
      <LPBlockListFitting garment={garment} />
    </ul>
  </div>
}))

const AdditionalPage = ({garments, ...props}) => {
  return <div className='additional-page'>

    <Pagination position='right'/>
    {garments.garmentsWithAcitve.map(g => <LPBlock key={g.name} garment={g}/>)}

  </div>
};

export default observer(AdditionalPage)
