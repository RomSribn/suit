import React, { Component } from 'react'
import { inject, observer } from 'mobx-react'
import Pagination from '../Pagination'

@inject('app') @observer
export class MYBRow extends Component {
  changeHandle(e) {
    const { fitting } = this.props
    fitting.value = e.target.value
  }

  render() {
    const { fitting, app, garment } = this.props
    return <div className="myb-category">
      <label className="myb_label">{fitting[`title_${app.lang}`]}</label>
      <div className="myb_input-block">
        <input
          value={fitting.value}
          type="text"
          className="myb_input"
          onChange={::this.changeHandle}
          autoFocus={fitting.active}
          onFocus={e => garment.activeFitting = fitting}/>
        <span className="myb_system">см</span>
      </div>
    </div>
  }
}

const MYB = observer(({garment, ...props}) => {
  return [
    <Pagination key="pagi" position="right"/>,
    <section key="measure" className="myb">
      <div className="myb-container">
        <h2 className="heading">Measure your body</h2>
        <div className="myb-inputs-container">
          {garment.fittings.map((f, i) => <MYBRow key={i} fitting={f} garment={garment} />)}
        </div>
      </div>
    </section>
  ]
})

export default MYB
