import * as React from 'react';
import * as ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import { TRANSITION_DUARAION } from '../../config/constants';

class FadeIn extends React.PureComponent<{children: any}> { // tslint:disable-line no-any
    render() {
        return (
            <ReactCSSTransitionGroup
                transitionName="fade-in-absolute"
                transitionEnterTimeout={TRANSITION_DUARAION}
                transitionLeaveTimeout={TRANSITION_DUARAION}
            >
                {this.props.children}
            </ReactCSSTransitionGroup>
        );
    }
}

export {
    FadeIn
};
