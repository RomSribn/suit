import * as React from 'react';
import { Link } from 'react-router-dom';
import * as _ from 'lodash';
import { loc } from './loc';

class GroupChoice extends React.PureComponent<GroupChoiceProps> {
    componentDidMount() {
        this.props.setSubgroupTitle(this.props.choiceItem.value);
    }
    backClick = () => {
        this.props.popOrderPathitem();
    }
    render() {
        const {
            match: {params: { garment, subgroup, group }},
            order,
            backLink,
            choiceItem,
            lang
        } = this.props;
        const choiceItemValue = _.get(order, `${garment}[0].${subgroup}.${group}.title.${lang}`, loc[lang].noStatus);
        return (
                <Link to={backLink} onClick={this.backClick} className="custom custom--open">
                    <span className="custom__content">
                        <span className="custom__name">{choiceItem.value}:</span>
                        <span className="custom__status">{choiceItemValue}</span>
                    </span>
                    <span className="custom__control"/>
                </Link>
        );
    }
}

export {
    GroupChoice,
};