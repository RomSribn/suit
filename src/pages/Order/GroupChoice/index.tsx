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
import './styles.styl';

export const basisPart = 'basis';

@inject<CommonStores, GroupChoiceProps, {}, unknown>(({order, app, filterStore, garments: { Subgroups } }) => {
    return {
        subgroupsStore: new Subgroups('shirt'),
        app,
        filterStore,
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

    handleReset = () => {
        const { orderStore, match: { params: { garment } } } = this.props;
        orderStore!.clearAdditionalFabric(garment);
    }

    render() {
        const {
            match: { params: { garment, subgroup, group } },
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
        const partOfShirtToggleItems = [
            {
                subsection_our_code: basisPart,
                title: { [lang]: loc[lang].basis },
            },
            ...itemsWithOwnFabric,
        ];

        const togglesBlock = (
            <div className="toggles-block">
                <div className="toggles">
                    {partOfShirtToggleItems.map((item) => (
                        <span key={item.subsection_our_code} className="toggle">
                        <input
                            className="toggle__input"
                            type="radio"
                            name="allowed_own_fabric"
                            id={item.subsection_our_code}
                            value={item.subsection_our_code}
                            checked={orderStore!.partOfShirtToggle === item.subsection_our_code}
                            onChange={this.handleChange}
                        />
                        <label className="toggle__label" htmlFor={item.subsection_our_code}>
                            {loc[lang].for} {item.title[lang]}
                        </label>
                    </span>
                    ))}
                </div>
                <button className="toggles-block__btn" onClick={this.handleReset}>{loc[lang].reset}</button>
            </div>
        );

        return (
            <Switch>
                <Route path={routes.fabric}>
                    <>
                    <div className="custom custom--open" style={{ overflow: 'hidden', cursor: 'unset' }}>
                        {content}
                        <div
                            className="custom__control_new"
                            style={{
                                 flexBasis: this.props.app && this.props.app.isSearchBarOpened ? 'auto' : 0,
                             }}
                        >
                            <form
                                style={{
                                    display: isMobile() ? 'none' : 'block',
                                    cursor: 'pointer',
                                    transition: '0.3s',
                                    transform: this.props.app && this.props.app.isSearchBarOpened ?
                                        'unset' : 'translateX(34%)'
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
                                        placeholder={'Поиск ...'}
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
                    {togglesBlock}
                    </>
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
