import * as React from 'react';
// import * as ReactCSSTransitionGroup from 'react-addons-css-transition-group';
// import { TRANSITION_DUARAION } from '../../../config/constants';
import { ChoiceItems } from '../../../containers/MainSectionChoiceItems';

class SubgroupChoice extends React.PureComponent<SubgroupChoiceProps> {
    render() {
        const {
            data,
            match,
        } = this.props;

        return (
        <ChoiceItems
            basicRoute={match.url}
            items={data!}
        />
        );
    }
}

export {
    SubgroupChoice,
};