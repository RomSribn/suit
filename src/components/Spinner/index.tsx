import * as React from 'react';
import { StylistInfo } from './StylistInfo';
import ProgressBar from '@ramonak/react-progress-bar';
import './styles.styl';

const LinearSpinner = ({ progress = 0, total }: ILinearSpinnerProps) => {
  let totalValid = total;
  if (!totalValid) {
    totalValid = 1;
  }
  const percent = (progress * 100) / totalValid;

  return (
    <div className="spinner-linear">
      <ProgressBar
        completed={percent}
        bgColor="#000"
        height="2px"
        borderRadius="0"
        labelAlignment="outside"
        isLabelVisible={false}
        baseBgColor="#b7b7b7"
        labelColor="#000000"
      />
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
