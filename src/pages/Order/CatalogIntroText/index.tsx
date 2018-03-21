import * as React from 'react';
import * as ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import { TRANSITION_DUARAION } from '../../../config/constants';
import { loc } from './loc';

const CatalogIntroText = (props: Props) => {
    const {
        lang,
    } = props;
    return (
        <ReactCSSTransitionGroup
            transitionName="fade-in-absolute"
            transitionEnterTimeout={TRANSITION_DUARAION}
            transitionLeaveTimeout={TRANSITION_DUARAION}
        >
            <div className="catalog__intro-txt" key={lang}>
                {loc[lang!].introText.first}
                <br />
                {loc[lang!].introText.second}
            </div>
        </ReactCSSTransitionGroup>
    );
};

export {
    CatalogIntroText,
};