import * as React from 'react';
import * as ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import { TRANSITION_DUARAION } from '../../config/constants';

type P = {
    children: React.ReactElement<any>[]| React.ReactElement<any> | any // tslint:disable-line no-any
};

class FadeIn extends React.PureComponent<P> {  // tslint:disable-line no-any
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
