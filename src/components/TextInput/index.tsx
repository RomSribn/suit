import * as React from 'react';
import './index.styl';

const TextInput = ({
  title,
  placeholder,
  value = '',
  onChange,
  required,
  type,
}: ITextInput) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange!(`${title}:${e.target.value}`, e);
  };
  return (
    <label className="text-input">
      <span className="text-input__title">{`${title}:`}</span>
      <input
        placeholder={placeholder}
        className="input"
        value={value}
        onChange={handleChange}
        required={required}
        type={type}
      />
    </label>
  );
};

TextInput.defaultProps = {
  required: false,
  type: 'text',
};

export { TextInput };
