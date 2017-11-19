import React, {Component} from 'react'
import Dummy from 'Components/Main/Dummy'
import _ from 'lodash'

const imgToRight = (current, imageCount) => {
  return current === 1 ? imageCount : (current - 1) % imageCount
}
const imgToLeft = (current, imageCount) => {
  return 1 + current % imageCount
}

class DummyContainer extends Component {
  constructor(props) {
    super(props)
    this.state = {
      mouseDown: false,
      img: 89,
      animate: false,
      scaleCoefficient: props.scaleCoefficient,
      imageYOffset: 0,
    }
  }

  startAnimation() {
    if (this.animateInterval) {
      return
    }
    this.setState({animate: true}, () => {
      this.animateInterval = setInterval(
        () => {
          this.setState({
            img: imgToRight(this.state.img, this.props.imageCount)
          })

        }, this.props.speed)
    })
  }

  stopAnimation() {
    this.setState({animate: false})
    clearInterval(this.animateInterval)
    this.animateInterval = undefined
  }

  onMouseDown(e) {
    e.preventDefault()
    this.setState({mouseDown: true})
    this.setState({
      lastPos: e.nativeEvent.offsetX,
      lastPosY: e.nativeEvent.offsetY
    })
    this.stopAnimation(e)
  }

  onMouseUp(e) {
    this.setState({
      mouseDown: false,
    })
    //this.startAnimation(e)
  }

  onMouseMove(e) {
    if (this.state.mouseDown) {
      let rotateNumber = (this.state.lastPos - e.nativeEvent.offsetX) / 2
      if (rotateNumber > 0) {
        this.rotateLeft(Math.floor(rotateNumber))
      } else {
        this.rotateRight(Math.floor(Math.abs(rotateNumber)))
      }

      //console.log(e.clientY, e.currentTarget.offsetWidth)
      //console.log(this.state.imageYOffset, e.nativeEvent.offsetY, this.state.lastPosY)
      this.setState({
        lastPos: e.nativeEvent.offsetX,
        lastPosY: e.nativeEvent.offsetY,
        imageYOffset: e.clientY
      })
    }
  }

  rotateLeft(number) {
    _.times(number, () => {
      this.setState({
        img: imgToLeft(this.state.img, this.props.imageCount)
      })
    })
  }

  rotateRight(number) {
    _.times(number, () => {
      this.setState({
        img: imgToRight(this.state.img, this.props.imageCount)
      })
    })
  }

  onMouseLeave() {
    //this.startAnimation()
    //  this.setState({
    //    mouseDown: false,
    //  })
  }

  onWheel(e) {
    e.stopPropagation()
    const roundedCoefficient = Math.round(this.state.scaleCoefficient * 10) / 10
    if ((roundedCoefficient === 1.0 && e.deltaY > 0) || (roundedCoefficient >= this.props.maxScale && e.deltaY < 0)) {
      return
    }
    const wheelUp = e.deltaY < 0
    const vla = e.target.getBoundingClientRect().top > 0 ? e.target.getBoundingClientRect().top : 0
    const offsetTop = e.clientY - vla
    this.setState({
      imageYOffset: offsetTop,
      scaleCoefficient:
        (roundedCoefficient === 1.0 && !wheelUp)
        || (roundedCoefficient >= this.props.maxScale && wheelUp)
          ? roundedCoefficient
          : this.state.scaleCoefficient - Math.round(e.deltaY * this.props.scaleRate * 10) / 10
    })
  }

  // TODO clear timer interval
  componentDidMount() {
    //  this.animateInterval = setInterval(() => {
    //    this.setState({
    //      img: imgToRight(this.state.img, this.props.imageCount)
    //    })
    //  }, this.props.speed)
  }

  render() {
    return <Dummy {...this.props}
                  img={this.state.img}
                  imageYOffset={this.state.imageYOffset}
                  scaleCoefficient={this.state.scaleCoefficient}
                  onMouseLeave={::this.onMouseLeave}
                  onMouseMove={::this.onMouseMove}
                  onMouseUp={::this.onMouseUp}
                  onMouseDown={::this.onMouseDown}
                  onWheelCapture={::this.onWheel}/>
  }
}

DummyContainer.defaultProps = {
  scaleCoefficient: 1,
  maxScale: 3,
  scaleRate: 0.001,
  speed: 100,
  imageCount: 89
}

export default DummyContainer
