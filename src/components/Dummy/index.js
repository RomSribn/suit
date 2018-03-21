import React from "react";
import classnames from 'classnames';
import './Dummy.styl';
const path = "http://194.87.239.90/fabric/images/3D/mannequin/2650x2650/";

const Dummy = props => {
  const imgs = [];
  for (let i = 1; i < props.imageCount + 1; i++) {
    const active = i === props.img;
    imgs.push(
      <img
      key={i}
      src={`${path}${i}.png`}
      className={
        classnames(
          'preview__dummy-img',
          { 'dummy__img-active': active}
        )
      }
      alt="dummy"
    />,
      <img
      key={`shirt${i}`}
      className={
          classnames(
            'preview__dummy-img',
            { 'dummy__img-active': active}
          )
        }
        src={`http://194.87.239.90/fabric/images/3D/shirt/1193/collars/BR/2650x2650/${i}.png`}
        alt="some img"/>
    );
  }
  return (
    <div
      className="dummy" 
      onMouseLeave={props.onMouseLeave}
      onMouseMove={props.onMouseMove}
      onMouseUp={props.onMouseUp}
      onMouseDown={props.onMouseDown}
      onWheelCapture={props.onWheelCapture}
      style={{
        position: 'relaive',
        transformOrigin: `50% ${props.imageYOffset}px`,
        transform: `scale(${props.scaleCoefficient}) `
      }}
    >
      {imgs}
      {/* <img
        src={`${path}${props.img}.png`}
        className="preview__dummy-img dummy__img-active"
        alt="dummy"
      />
      <img
      className="preview__dummy-img dummy__img-active"
        src={`http://194.87.239.90/fabric/images/3D/shirt/1191/collars/BR/2650x2650/${props.img}.png`}
        alt="some img"/> */}
      <div className="wearing">
      </div>
    </div>
  );
};

export default Dummy;
