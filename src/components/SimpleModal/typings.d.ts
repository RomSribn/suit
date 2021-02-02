interface SimpleModalProps {
  callback: (resultKey?: string) => void;
  data: {
    title?: string;
    desc: string;
    buttons: ButtonType[];
  };
  timeout?: number;
  show: boolean;
  isSmall: boolean;
  isTransparent: boolean;
}

interface ButtonType {
  key: string;
  text: string;
  theme: 'black' | 'white';
}
