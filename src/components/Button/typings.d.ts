interface ButtonProps {
  children?: React.ReactElement<any>[] | React.ReactElement<any> | any;
  onClick?: (...args: any[]) => any | null;
  className?: string;
  type?: string;
  disabled?: boolean;
  style?: object;
  invertTheme?: boolean;
  theme?: 'black' | 'white';
  link?: string;
}
