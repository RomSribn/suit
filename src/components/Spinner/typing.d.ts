interface ILinearSpinnerProps {
  progress: number;
  total: number;
}

interface ISpinnerProps extends ILinearSpinnerProps {
  theme: 'animated' | 'linear';
}
