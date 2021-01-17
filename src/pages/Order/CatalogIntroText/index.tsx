import * as React from 'react';
import * as ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import { TRANSITION_DUARAION } from '../../../config/constants';
import { loc } from './loc';

const CatalogIntroText = (props: Props) => {
    const {
        lang,
        isClearSubmit
    } = props;
    return (
        <ReactCSSTransitionGroup
            transitionName="fade-in-absolute"
            transitionEnterTimeout={TRANSITION_DUARAION}
            transitionLeaveTimeout={TRANSITION_DUARAION}
        >
            <div className="catalog__intro-txt" key={lang}>
                <p>{loc[lang!].introText.first}</p>

                <p>{loc[lang!].introText.second}</p>
                {isClearSubmit && (<span className="intro-txt__info">*</span>)}
            </div>
            <div className="catalog__gender-block">
                <button>{loc[lang!].introText.forHim}</button>
                <button disabled={true}>{loc[lang!].introText.forHer}</button>
            </div>
        </ReactCSSTransitionGroup>
    );
};

export {
    CatalogIntroText,
};