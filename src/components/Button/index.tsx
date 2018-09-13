import * as React from 'react';
import * as classNames from 'classnames';

import './style.styl';

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
            theme
        } = this.props;
        const whiteTheme = theme === 'white';
        return (
            <span
                className={classNames(
                    'button-bar',
                    {
                        white: whiteTheme
                    }
                )}
            >
                <button
                    onClick={onClick}
                    type={type}
                    style={style}
                    className={
                        classNames(
                            className,
                            'button',
                            { disabled },
                            { black: !whiteTheme },
                            { white: whiteTheme },
                            { invert: invertTheme }
                        )
                    }
                >{children}
                {
                    whiteTheme &&
                    <div className="frame">
                        <svg width="100%" height="100%">
                            <rect
                                className="rect rect--1"
                                width="100%"
                                height="100%"
                            />
                            <rect
                                className="rect rect--2"
                                width="100%"
                                height="100%"
                            />
                        </svg>
                    </div>
                }
                </button>
            </span>
        );
    }
}

export {
    Button
};
