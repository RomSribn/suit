import * as React from 'react';
import { StylistInfo } from './StylistInfo';
import './styles.styl';

const LinearSpinner = ({ progress, total }: ILinearSpinnerProps) => {
  const percentage = `${(progress * 100) / total}%`;
  return (
    <div className="spinner">
      <svg width="100%" height="100%">
        <line className="line line--1" x1="0" x2="100%" />
        <line className="line line--2 line--static" x1="0" x2={percentage} />
      </svg>
    </div>
  );
};

const SimpleSpinner = () => {
  return (
    <div className="spinner">
      <svg width="100%" height="100%">
        <line className="line line--1" x1="0" x2="100%" />
        <line className="line line--2 line--animated" x1="0" x2="100%" />
      </svg>
    </div>
  );
};

const Spinner = ({ theme, progress, total }: ISpinnerProps) => {
  const SpinnerLine = {
    linear: LinearSpinner,
    animated: SimpleSpinner,
  }[theme];

  return (
    <div className="spinner__wrapper">
      <StylistInfo />
      <SpinnerLine progress={progress} total={total} />
    </div>
  );
};

export { LinearSpinner, Spinner, SimpleSpinner };
