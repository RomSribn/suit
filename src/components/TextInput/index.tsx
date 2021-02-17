import * as React from 'react';
import * as classNames from 'classnames';
import './index.styl';

const TextInput = ({
  title,
  placeholder,
  value = '',
  onChange,
}: ITextInput) => {
  const [animation, setAnimation] = React.useState(!!value.length);
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange!(`${title}:${e.target.value}`);
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
        type="text"
        placeholder={placeholder}
        className={classNames('input', { hide: !animation })}
        value={value}
        onChange={handleChange}
        onFocus={() => setAnimation(true)}
        onBlur={() => !value.length && setAnimation(false)}
      />
    </label>
  );
};

export { TextInput };
