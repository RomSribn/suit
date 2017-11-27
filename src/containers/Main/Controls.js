import React from 'react'
import Controls from 'Components/Main/Controls'

class ControlsContainer extends React.Component {

  render () {
    return (
      <Controls
        color={this.props.color}
        leftIcon={this.props.leftIcon}
        leftText={this.props.leftText}
        centerIcon={this.props.centerIcon}
        centerText={this.props.centerText}
        rightIcon={this.props.rightIcon}
        rightText={this.props.rightText}
      />
    )
  }
}

export default ControlsContainer;
