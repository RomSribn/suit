import * as React from 'react';
import { Link, Route, Switch } from 'react-router-dom';
import * as _ from 'lodash';
import { loc } from './loc';
import { isMobile, isLandscape } from '../../../utils';
import { inject, observer } from 'mobx-react';
import { GroupChoiceProps } from './typings';
import { CommonStores } from '../../../types/commonStores';
import { routes } from '../routes';
import { Controll } from '../Filter';

@inject<CommonStores, GroupChoiceProps, {}, unknown>(({ app, garments: { Subgroups } }) => {
    return {
        subgroupsStore: new Subgroups('shirt'),
    };
})
@observer
class GroupChoice extends React.PureComponent<GroupChoiceProps> {
    componentDidMount() {
        this.props.setSubgroupTitle(this.props.choiceItem.value);
    }
    backClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
        e.preventDefault();
        const backButtonElement = document.querySelector<HTMLButtonElement>('.button.back-button');
        if (backButtonElement) {
            backButtonElement.click();
        }
    }

    render() {
        const {
            match: { params: { garment, subgroup, group } },
            order,
            backLink,
            lang,
            subgroupsStore,
        } = this.props;

        let choiceItemValue: string | undefined;
        if (group === 'initials_text') {
            // @ts-ignore
            choiceItemValue = _.get(order, `${garment}[0].${subgroup}.${group}`);
        }

        if (!choiceItemValue) {
            choiceItemValue = _.get(order, `${garment}[0].${subgroup}.${group}.title.${lang}`, loc[lang].noStatus);
        }
        const itemValue = isMobile() && !isLandscape() && choiceItemValue && choiceItemValue!.length > 13
            ? choiceItemValue!.slice(0, 10) + '...'
            : choiceItemValue;

        const subgroupName = subgroupsStore!.data
            ? subgroupsStore!.data[subgroup]
                .find((item: Subgroup) => item.subsection_our_code === group).title[lang]
            : '';
        const content = (
            <>
                <span className="custom__content">
                    <span className="custom__name">{subgroupName}:</span>
                    <span className="custom__status">{itemValue}</span>
                </span>
                {/* <span className="custom__control"/> */}
            </>
        );
        return (
            <Switch>
                <Route path={routes.fabric}>
                    <div className="custom custom--open" style={{ cursor: 'unset' }}>
                        {content}
                        <div className="custom__control_new">
                            <div className="control__searchBar">
                                <input type="text" />
                            </div>
                            < Controll />
                        </div>
                    </div>
                </Route>
                <Link to={backLink} onClick={this.backClick} className="custom custom--open">
                    {content}

                </Link>
            </Switch>
        );
    }
}

export {
    GroupChoice,
};
