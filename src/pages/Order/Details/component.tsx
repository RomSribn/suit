import * as React from 'react';
import { ChoiceItems } from '../../../components/MainSectionChoiceItems';

class Main extends React.PureComponent<DetailsProps> {
    static defaultProps = {
        activeGarments: [],
    };
    render() {
        const {
            activeGarments,
        } = this.props;
        return (<ChoiceItems items={activeGarments!} basicRoute="/order/details"/>);
    }
}

export {
    Main,
};