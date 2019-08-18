import * as React from 'react';
import { StylistInfo } from './StylistInfo';
import './styles.styl';

const Spinner = () => {
    return (
        <div className="spinner__wrapper">
            <StylistInfo />
            <div className="spinner">
                <svg width="100%" height="100%">
                    <line className="line line--1" x1="0" x2="100%" />
                    <line className="line line--2" x1="0" x2="100%" />
                </svg>
            </div>
        </div>
    );
};

export {
    Spinner
};
