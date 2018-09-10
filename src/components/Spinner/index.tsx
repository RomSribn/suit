import * as React from 'react';
import './styles.styl';

const Spinner = () => {
    return (
        <div className="spinner__wrapper">
            <div className="spinner">
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
        </div>
    );
};

export {
    Spinner
};
