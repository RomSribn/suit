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

@inject<CommonStores, GroupChoiceProps, {}, unknown>(({ app, filterStore, garments: { Subgroups } }) => {
    return {
        subgroupsStore: new Subgroups('shirt'),
        // @ts-ignore
        app,
        // @ts-ignore
        filterStore
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
                    <div className="custom custom--open" style={{ overflowX: 'hidden', cursor: 'unset' }}>
                        {content}
                        <div className="custom__control_new">
                            <form
                                style={{
                                    display: isMobile() ? 'none' : 'block',
                                    cursor: 'pointer',
                                    transition: '0.5s',
                                    // @ts-ignore
                                    transform: this.props.app.isSearchBarOpened ?
                                        'unset' : 'translateX(82%)'
                                }}
                                className="search"
                            >
                                <div style={{ background: 'transparent' }} className="search__control">
                                    <span
                                        style={{
                                            zIndex: this.props.filterStore &&
                                                this.props.filterStore.isOpen ? -1 : 9999
                                        }}
                                        className="search__icon"
                                        onClick={() => {
                                            // @ts-ignore
                                            this.props.app.toggleIsSearchBarOpened(true);
                                        }}
                                    />
                                    <input
                                        style={{
                                            background: 'transparent',
                                            // @ts-ignore
                                            visibility: this.props.app.isSearchBarOpened ? 'visible' : 'hidden'
                                        }}
                                        type="search"
                                        maxLength={150}
                                        autoComplete="off"
                                        // @ts-ignore
                                        onChange={(e) => this.props.app.setCurrentSearchValue(e.target.value)}
                                        // @ts-ignore
                                        className="search__input"
                                        placeholder={'Поиск ...'}
                                    />
                                    <span
                                        className={`icon-close search__clear search__fabric 
                                        
                                        ${
                                            // @ts-ignore
                                            this.props.app.isSearchBarOpened ? 'show' : ''}`}
                                        title="Clear"
                                        onClick={() => {
                                            // @ts-ignore
                                            this.props.app.toggleIsSearchBarOpened(false);
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
