import * as React from 'react';
import { Link, Route, Switch } from 'react-router-dom';
import * as _ from 'lodash';
import { loc } from './loc';
import { isMobile, isLandscape, isTablet } from '../../../utils';
import { inject, observer } from 'mobx-react';
import { GroupChoiceProps } from './typings';
import { CommonStores } from '../../../types/commonStores';
import { routes } from '../routes';
import { Controll } from '../Filter';

@inject<CommonStores, GroupChoiceProps, {}, unknown>(({ app, filterStore, garments: { Subgroups } }) => {
    return {
        subgroupsStore: new Subgroups('shirt'),
        app,
        filterStore,
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

        const fixedGarment = subgroup === 'fitting' ? 'shirt' : garment;

        let choiceItemValue: string | undefined;
        if (group === 'initials_text') {
            // @ts-ignore
            choiceItemValue = _.get(order, `${fixedGarment}[0].${subgroup}.${group}`);
        }

        if (!choiceItemValue) {
            choiceItemValue =
            _.get(order, `${fixedGarment}[0].${subgroup}.${group}.title.${lang}`, loc[lang].noStatus);
        }

        const itemValue = isMobile() && !isLandscape() && choiceItemValue && choiceItemValue!.length > 15 ||
            !(isMobile() || (isTablet() && !isLandscape()))
            ? choiceItemValue!.slice(0, 12) + '...'
            : choiceItemValue;
        // console.log('subStore.data', subgroupsStore!.data![subgroup]); // tslint:disable-line
        // console.log('group', group); // tslint:disable-line
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
                {(subgroup === 'fitting') || (subgroup === 'design') && <span className="custom__control"/>}
            </>
        );

        return (
            <Switch>
                <Route path={routes.fabric}>
                    <div className="custom custom--open" style={{ overflow: 'hidden', cursor: 'unset' }}>
                        {content}
                        <div className="custom__control_new">
                            <form
                                style={{
                                    display: isMobile() ? 'none' : 'block',
                                    cursor: 'pointer',
                                    transition: '0.5s',
                                    transform: this.props.app && this.props.app.isSearchBarOpened ?
                                        'unset' : 'translateX(74%)'
                                }}
                                className="search"
                            >
                                <div style={{ background: 'transparent' }} className="search__control">
                                    <span
                                        style={{
                                            zIndex: 9999
                                        }}
                                        className="search__icon"
                                        onClick={() => {
                                            this.props.app!.toggleIsSearchBarOpened();
                                            if (this.props.filterStore!.isOpen) {
                                                this.props.filterStore!.toggleOpen();
                                            }
                                        }}
                                    />
                                    <input
                                        style={{
                                            background: 'transparent',
                                            visibility: this.props.app && this.props.app.isSearchBarOpened
                                                ? 'visible' : 'hidden'
                                        }}
                                        type="search"
                                        maxLength={150}
                                        autoComplete="off"
                                        onChange={(e) => this.props.app
                                            && this.props.app.setCurrentSearchValue(e.target.value)}
                                        className="search__input"
                                        placeholder={loc[lang].search}
                                    />
                                    <span
                                        className={`icon-close search__clear search__fabric
                                        ${
                                            this.props.app && this.props.app.isSearchBarOpened ? 'show' : ''}`}
                                        title="Clear"
                                        onClick={() => {
                                            this.props.app!.toggleIsSearchBarOpened();
                                        }}
                                        style={{
                                            width: '40px'
                                        }}
                                    />
                                </div>
                            </form>
                            < Controll />
                        </div>
                    </div>
                </Route>
                {subgroup === 'fitting' ?
                    <Link to={backLink}  className="custom custom--open">
                        {content}
                    </Link> :
                    <Link to={backLink} onClick={this.backClick} className="custom custom--open">
                        {content}
                    </Link>}
            </Switch>
        );
    }
}

export {
    GroupChoice,
};
