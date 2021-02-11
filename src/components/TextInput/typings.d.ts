interface ITextInput {
  title: string;
  placeholder?: string;
  value?: string;
  onChange?: (value: string, e: React.ChangeEvent<HTMLInputElement>) => void;
  required: boolean;
  type: string;
}
