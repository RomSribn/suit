import * as React from 'react';
import { ChoiceItems } from '../../../containers/MainSectionChoiceItems';

class SubgroupChoice extends React.PureComponent<SubgroupChoiceProps> {
    render() {
        const {
            data,
            match,
            lang
        } = this.props;

        return (
            <ChoiceItems
                lang={lang}
                basicRoute={match.url}
                items={data!}
            />
        );
    }
}

export {
    SubgroupChoice,
};