interface ITextInput {
  title: string;
  placeholder?: string;
  value?: string;
  onChange?: (value: string) => void;
}
