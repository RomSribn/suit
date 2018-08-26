import * as React from 'react';
import { Link } from 'react-router-dom';

class GroupChoice extends React.PureComponent<GroupChoiceProps> {
    backClick = () => {
        this.props.popOrderPathitem();
    }
    render() {
        const {
            match: {params: { garment, subgroup, group }},
            order,
            backLink,
            choiceItem,
        } = this.props;
        let choiceItemValue = '';
        try {
            choiceItemValue = order[garment][0][subgroup][group];
        } catch (_) {
            choiceItemValue = 'fail';
        }
    
        return (
                <Link to={backLink} onClick={this.backClick} className="custom custom--open">
                    <span className="custom__name">{choiceItem.value}:</span>
                    <span className="custom__status">{choiceItemValue}</span>
                </Link>
        );
    }
}

export {
    GroupChoice,
};