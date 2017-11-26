import React from "react";

const Controls = props => {
  return (
    <div className={`controls controls--${props.color}`}>
      <div className="circle left">
        <img src={props.leftIcon} alt="" />
        <span className="text">{props.leftText}</span>
      </div>
      <div className="circle center">
        <img src={props.centerIcon} alt="" />
        <span className="text">{props.centerText}</span>
      </div>
      <div className="circle right">
        <img src={props.rightIcon} alt="" />
        <span className="text">{props.rightText}</span>
      </div>
    </div>
  );
};

export default Controls;
