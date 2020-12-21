import * as React from 'react';
import { Link } from 'react-router-dom';
import * as _ from 'lodash';
import { loc } from './loc';
import { isMobile, isLandscape, isTablet } from '../../../utils';
import { inject, observer } from 'mobx-react';
import { GroupChoiceProps } from './typings';
import { CommonStores } from '../../../types/commonStores';
import { Controll, Filter } from '../Filter';
import './styles.styl';
import { Navlinks } from '../../../components/Header/HeaderContent/navlinks';
import { PopUp } from '../../../containers/Popup';

@inject<CommonStores, GroupChoiceProps, {}, unknown>(
    ({ order, app, filterStore, user, garments: { Subgroups, garments } }) => {
        return {
            userStore: user,
            activeGarments: [...garments!.activeGarments],
            subgroupsStore: new Subgroups('shirt'),
            app,
            filterStore,
            orderStore: order,
        };
    }
)
@observer
class GroupChoice extends React.PureComponent<GroupChoiceProps> {
    state = {
        modalIsOpen: false,
        showFilterBtn: true,
    };

    componentDidMount() {
        this.props.setSubgroupTitle(this.props.choiceItem.value);
    }
    backClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
        e.preventDefault();
        const backButtonElement = document.querySelector<HTMLButtonElement>(
            '.button.back-button'
        );
        if (backButtonElement) {
            backButtonElement.click();
        }
    }

    handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        this.props.orderStore!.setPartOfShirtToggle(e.target.value);
    }

    openModal = () => {
        this.setState({ modalIsOpen: true });
    }

    closeModal = () => {
        this.setState({ modalIsOpen: false });
    }

    render() {
        const { modalIsOpen, showFilterBtn } = this.state;
        const {
            match: {
                params: { garment, subgroup, group },
            },
            order,
            backLink,
            lang,
            subgroupsStore,
            userStore,
            // activeGarments,
        } = this.props;
        const fixedGarment = subgroup === 'fitting' ? 'shirt' : garment;

        let choiceItemValue: string | undefined;
        if (group === 'initials_text') {
            // @ts-ignore
            choiceItemValue = _.get(order, `${fixedGarment}[0].${subgroup}.${group}`);
        }

        if (!choiceItemValue) {
            choiceItemValue = _.get(
                order,
                `${fixedGarment}[0].${subgroup}.${group}.title.${lang}`,
                loc[lang].noStatus
            );
        }

        const itemValue =
            (isMobile() &&
                !isLandscape() &&
                choiceItemValue &&
                choiceItemValue!.length > 15) ||
                !(isMobile() || (isTablet() && !isLandscape()))
                ? choiceItemValue!.slice(0, 12) + '...'
                : choiceItemValue;

        let itemFound: Subgroup | null = null;
        if (
            subgroupsStore &&
            subgroupsStore!.data &&
            subgroupsStore!.data![subgroup]
        ) {
            itemFound = subgroupsStore!.data![subgroup].find(
                (item: Subgroup) => item.subsection_our_code === group
            );
        }

        const name = itemFound ? itemFound.title[lang] : '';

        const content = (
            <>
                <span className="custom__content">
                    {isMobile() && !this.props.app!.isSearchBarOpened ? (
                        <Navlinks
                            garment={fixedGarment}
                            isAuth={userStore!.isAuth}
                            lang={lang}
                        />
                    ) : (
                            <>
                                <span className="custom__name">{name}:</span>
                                <span className="custom__status">{itemValue}</span>
                            </>
                        )}
                </span>
                {subgroup === 'fitting' ||
                    (subgroup === 'design' && (
                        <Link to={backLink} className="custom__control-btn">
                            <span className="span" />
                        </Link>
                    ))}
            </>
        );

        let lastParametr = this.props.match.url.split('/');

        return (
            <>
                <div className="custom custom--open" style={{ overflow: 'hidden' }}>
                    {content}
                    <div
                        className="custom__control_new"
                        style={{
                            marginRight: !(
                                lastParametr[lastParametr.length - 1] === 'fabric' ||
                                lastParametr[lastParametr.length - 1] === 'design' ||
                                lastParametr[lastParametr.length - 1] === 'fitting'
                            )
                                ? 30
                                : 0,
                        }}
                    >
                        <form
                            style={{
                                cursor: 'pointer',
                                transition: '0.3s',
                                transform:
                                    this.props.app && this.props.app.isSearchBarOpened
                                        ? 'unset'
                                        : isMobile()
                                            ? 'translateX(60%)'
                                            : 'translateX(74%)',
                            }}
                            className="search dslkf"
                        >
                            <div
                                style={{ background: 'transparent' }}
                                className="search__control"
                            >
                                <span
                                    style={{
                                        zIndex: 9999,
                                    }}
                                    className="search__icon"
                                    onClick={() => {
                                        this.props.app!.toggleIsSearchBarOpened();
                                        if (this.props.filterStore!.isOpen) {
                                            this.props.filterStore!.toggleOpen();
                                        }
                                        if (isMobile()) {
                                            this.setState({ showFilterBtn: !showFilterBtn });
                                        }
                                    }}
                                />
                                <input
                                    style={{
                                        background: 'transparent',
                                        visibility:
                                            this.props.app && this.props.app.isSearchBarOpened
                                                ? 'visible'
                                                : 'hidden',
                                    }}
                                    type="search"
                                    maxLength={150}
                                    autoComplete="off"
                                    onChange={(e) =>
                                        this.props.app &&
                                        this.props.app.setCurrentSearchValue(e.target.value)
                                    }
                                    className="search__input"
                                    placeholder={loc[lang].search}
                                />
                                <span
                                    className={`icon-close search__clear search__fabric
                                        ${this.props.app &&
                                            this.props.app.isSearchBarOpened
                                            ? 'show'
                                            : ''
                                        }`}
                                    title="Clear"
                                    onClick={() => {
                                        this.props.app!.toggleIsSearchBarOpened();
                                        if (isMobile()) {
                                            this.setState({ showFilterBtn: !showFilterBtn });
                                        }
                                    }}
                                    style={{
                                        width: '30px',
                                    }}
                                />
                            </div>
                        </form>

                        {isMobile() &&
                            showFilterBtn &&
                            !this.props.app!.isSearchBarOpened && (
                                <Controll
                                    disableBtn={group !== 'fabric'}
                                    openModal={this.openModal}
                                />
                            )}

                        {!isMobile() &&
                            lastParametr[lastParametr.length - 1] === 'fabric' && (
                                <Controll openModal={this.openModal} />
                            )}
                    </div>
                </div>

                {modalIsOpen && (
                    <PopUp open={modalIsOpen} onClose={this.closeModal}>
                        <Filter onClose={this.closeModal} />
                    </PopUp>
                )}
            </>
        );
    }
}

export { GroupChoice };
