type TFile = {
  name: string;
  size: number;
  type: any;
  slice: any;
};

interface IThumbProps {
  file: TFile;
  index: string;
  handleRemove: (index: string) => void;
}

interface IfieldProps {
  name: string;
  value: string;
  onChange: () => void;
  onBlur: () => void;
}

interface IformProps {
  touched: object;
  errors: object;
}

interface IFileInputProps {
  id: number;
  title: string;
  dropMsg: string;
  // tslint:disable-next-line
  onDrop: any;
  files: File[];
  isShowThumb: boolean;
  handleRemove: TRemoveSpecificFileFromItem;
  limitOfFiles?: number;
}
