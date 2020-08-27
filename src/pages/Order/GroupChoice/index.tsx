import * as React from 'react';
import { Link, Route, Switch } from 'react-router-dom';
import * as _ from 'lodash';
import { loc } from './loc';
import { isMobile, isLandscape } from '../../../utils';
import { inject, observer } from 'mobx-react';
import { GroupChoiceProps } from './typings';
import { CommonStores } from '../../../types/commonStores';
import { routes } from '../routes';
import './styles.styl';

@inject<CommonStores, GroupChoiceProps, {}, unknown>(({order, garments: { Subgroups }}) => {
    return {
        subgroupsStore: new Subgroups('shirt'),
        orderStore: order,
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

    handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        this.props.orderStore!.setPartOfShirtToggle(e.target.value);
    }

    render() {
        const {
            match: {params: { garment, subgroup, group }},
            order,
            backLink,
            lang,
            subgroupsStore,
            orderStore,
        } = this.props;
        let itemsWithOwnFabric: Subgroup[] = [];
        if (subgroupsStore!.data) {
            itemsWithOwnFabric = subgroupsStore!.data.design
                .filter((s) => s.is_allowOwnFabric);
        }

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
                <span className="custom__control"/>
            </>
        );
        const partOfShirtToggleItems = [
            {
                subsection_our_code: 'all',
                title: { en: 'all', ru: 'все' },
            },
            ...itemsWithOwnFabric,
        ];

        return (
                <Switch>
                    <Route path={routes.fabric}>
                        <div className="custom custom--open" style={{cursor: 'unset'}}>
                            {content}
                            <div className="toggle">
                                {partOfShirtToggleItems.map(item =>
                                    <span key={item.subsection_our_code} className="toggle__item">
                                    <input
                                        className="toggle__input"
                                        type="radio"
                                        name="allowed_own_fabric"
                                        id={item.subsection_our_code}
                                        value={item.subsection_our_code}
                                        checked={orderStore!.partOfShirtToggle === item.subsection_our_code}
                                        onChange={this.handleChange}
                                    />
                                    <label className="toggle__label" htmlFor={item.subsection_our_code} >
                                        {loc[lang].for} {item.title[lang]}
                                    </label>
                                </span>
                                )}
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
