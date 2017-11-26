import React from 'react'
import './Controls.styl'

class Controls extends React.Component {

  constructor(props) {
    super(props)
  }

  render () {
    return (
      <div className={`controls controls--${this.props.color}` }>
        <div className="circle left">
          <img src={this.props.leftIcon} alt=""/>
          <span className="text">{this.props.leftText}</span>
        </div>
        <div className="circle center">
          <img src={this.props.centerIcon} alt=""/>
          <span className="text">{this.props.centerText}</span>
        </div>
        <div className="circle right">
          <img src={this.props.rightIcon} alt=""/>
          <span className="text">{this.props.rightText}</span>
        </div>
      </div>
    )
  }
}

export default Controls
