import React from "react";

const path = "http://194.87.239.90/fabric/images/3D/mannequin/1600x1600/";

const Dummy = props => {
  const imgs = [];
  for (let i = 1; i < props.imageCount + 1; i++) {
    imgs.push(
      <img
        key={i}
        src={`${path}${i}.png`}
        className={`preview__dummy-img ${
          props.img === i ? "dummy__img-active" : ""
        }`}
        alt="dummy"
      />
    );
  }
  return (
    <div
      className="man"
      onMouseLeave={props.onMouseLeave}
      onMouseMove={props.onMouseMove}
      onMouseUp={props.onMouseUp}
      onMouseDown={props.onMouseDown}
      onWheelCapture={props.onWheelCapture}
      style={{
        transformOrigin: `50% ${props.imageYOffset}px`,
        transform: `scale(${props.scaleCoefficient}) `
      }}
    >
      {imgs}
      <div className="wearing">
        <img src="http://194.87.239.90/fabric/images/3D/trousers/fabric_ref/30C8025/model/P06/1600x1600/1.png" alt="dummy wear"/>
      </div>
    </div>
  );
};

export default Dummy;
