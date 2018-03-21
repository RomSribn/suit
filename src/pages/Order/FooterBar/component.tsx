import * as React from 'react';
import { loc } from './loc';

class FooterBar extends React.PureComponent<FooterBarProps> {
    static defaultProps = {
        goBack: () => undefined,
        lang: 'en',
    };
    render() {
        const {
            goBack,
            lang,
        } = this.props;
        return (
            <div className="footer-btn-bar" onClick={goBack}>
                <div
                    className="footer-btn-bar__white"
                    style={{
                        cursor: 'pointer',
                    }}
                >
                    {loc[lang!].back}
                    <div className="footer-btn-bar__white-frame">
                        <svg width="100%" height="100%">
                            <rect
                                className="footer-btn-bar__white-rect footer-btn-bar__white-rect--1"
                                width="100%"
                                height="100%"
                            />
                            <rect
                                className="footer-btn-bar__white-rect footer-btn-bar__white-rect--2"
                                width="100%"
                                height="100%"
                            />
                        </svg>
                    </div>
                </div>
                <button className="btn footer-btn-bar__black-btn">{loc[lang!].add}
                </button>
            </div>
        );
    }
}

export {
    FooterBar,
};