import * as React from 'react';
import * as classNames from 'classnames';

import './style.styl';
import { Link } from 'react-router-dom';

class Button extends React.PureComponent<ButtonProps> {
  render() {
    const {
      children,
      onClick,
      type,
      className,
      invertTheme,
      style,
      disabled,
      theme,
      link,
    } = this.props;
    const whiteTheme = theme === 'white';

    const commonProps = {
      onClick,
      style,
      className: classNames(
        className,
        'button',
        { disabled },
        { black: !whiteTheme },
        { white: whiteTheme },
        { invert: invertTheme },
      ),
    };

    // @ts-ignore
    const Component = link ? Link : (props) => <button {...props} />;

    return (
      <span className={classNames('button-bar', { white: whiteTheme })}>
        <Component {...commonProps} to={link as string} type={type as 'button'}>
          {children}
          {whiteTheme && (
            <div className="frame">
              <svg width="100%" height="100%">
                <rect className="rect rect--1" width="100%" height="100%" />
                <rect className="rect rect--2" width="100%" height="100%" />
              </svg>
            </div>
          )}
        </Component>
      </span>
    );
  }
}

export { Button };
