import React, {Component} from 'react';
import Dummy from '../../components/Dummy';
import _ from 'lodash';

const imgToRight = (current, imageCount) => {
  return current === 1 ? imageCount : (current - 1) % imageCount
}
const imgToLeft = (current, imageCount) => {
  return 1 + current % imageCount
}

class DummyContainer extends Component {
  constructor(props){
   super(props)
   this.state = {
     mouseDown: false,
     img: 89,
     animate: false,
     scaleCoefficient: props.scaleCoefficient,
     imageYOffset: 0,
   }
   this._onMouseMove = _.throttle(this._onMouseMove, 100);
 }

 startAnimation() {
   if (this.animateInterval) {
     return
   }
   this.setState({animate: true}, () => {
     this.animateInterval = setInterval(
       ()=>{
         this.setState({
           img: imgToRight(this.state.img, this.props.imageCount)
         })

       },this.props.speed)
   })
 }

 stopAnimation() {
   this.setState({animate: false})
   clearInterval(this.animateInterval)
   this.animateInterval = undefined
 }

 onMouseDown = (e) => {
   e.preventDefault()
   this.setState({mouseDown: true})
   this.setState({
     lastPos: e.nativeEvent.offsetX,
     lastPosY: e.targetTouches ? e.targetTouches[0].pageY : e.clientY
   })
   this.stopAnimation(e)
 }

 onMouseUp = (e) => {
   this.setState({
     mouseDown: false,
   })
   //this.startAnimation(e)
 }

 onMouseMove = (e) => {
   e.persist();
   this._onMouseMove(e);
 }
  _onMouseMove = (e) => {
   if(this.state.mouseDown) {
     let rotateNumber = (this.state.lastPos - e.nativeEvent.offsetX)/2
     if(rotateNumber > 0) {
       this.rotateLeft(Math.floor(rotateNumber))
     } else {
       this.rotateRight(Math.floor(Math.abs(rotateNumber)))
     }

     const mousePositionY = e.targetTouches ? e.targetTouches[0].pageY : e.clientY //позиция при клике
     const my = this.state.lastPosY - mousePositionY // на сколько сдвинули

     let y = this.state.imageYOffset + my*this.state.scaleCoefficient
     y = y > 0 ? y : 0 //держим голову на уровне формы опций
     y = y > e.target.clientHeight ? e.target.clientHeight : y //держим ноги на уровне низа формы опций
     this.setState({
       lastPos: e.nativeEvent.offsetX,
       lastPosY: mousePositionY,
       imageYOffset: y
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

 onMouseLeave = () => {
   this.setState({
     mouseDown: false,
   })
 }

 onWheel = (e) => {
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
         : this.state.scaleCoefficient- Math.round(e.deltaY * this.props.scaleRate * 10) / 10
   })
 }

 // TODO clear timer interval
 componentDidMount(){
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
      onMouseLeave={this.onMouseLeave}
      onMouseMove={this.onMouseMove}
      onMouseUp={this.onMouseUp}
      onMouseDown={this.onMouseDown}
      onWheelCapture={this.onWheel} />
  }
}

DummyContainer.defaultProps = {
    scaleCoefficient: 1,
    maxScale: 3,
    scaleRate: 0.001,
    speed: 1000,
    imageCount: 89
}

export default DummyContainer
