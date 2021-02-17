import * as React from 'react';
import * as classNames from 'classnames';
import './index.styl';

const TextInput = ({
  title,
  placeholder,
  value = '',
  onChange,
  required,
  type,
}: ITextInput) => {
  const [animation, setAnimation] = React.useState(!!value.length);
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange!(`${title}:${e.target.value}`, e);
  };
  React.useEffect(() => {
    if (!value.length) {
      setAnimation(false);
    } else {
      setAnimation(true);
    }
  }, [value]);
  return (
    <label className="text-input">
      <span className={classNames('text-input__title', { animation })}>
        {`${title}:`}
      </span>
      <input
        placeholder={placeholder}
        className={classNames('input', { hide: !animation })}
        value={value}
        onChange={handleChange}
        required={required}
        type={type}
        onFocus={() => setAnimation(true)}
        onBlur={() => !value.length && setAnimation(false)}
      />
    </label>
  );
};

TextInput.defaultProps = {
  required: false,
  type: 'text',
};

export { TextInput };
