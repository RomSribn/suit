import * as React from 'react';
import './index.styl';

const TextInput = ({
  title,
  placeholder,
  value = '',
  onChange,
}: ITextInput) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange!(`${title}: ${e.target.value}`);
  };
  return (
    <label className="text-input">
      <span className="text-input__title">{`${title}:`}</span>
      <input
        type="text"
        placeholder={placeholder}
        className="input"
        value={value}
        onChange={handleChange}
      />
    </label>
  );
};

export { TextInput };
