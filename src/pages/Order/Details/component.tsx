import * as React from 'react';
import { ChoiceItems } from '../../../containers/MainSectionChoiceItems';

class Main extends React.PureComponent<DetailsProps> {
    static defaultProps = {
        activeGarments: [],
    };
    render() {
        // tslint:disable-next-line
        // debugger
        const {
            activeGarments,
        } = this.props;
        return (<ChoiceItems items={activeGarments!} basicRoute="/order/details"/>);
    }
}

export {
    Main,
};