import * as React from 'react';
// import { Link, Route, Switch } from 'react-router-dom';
import * as _ from 'lodash';
import { loc } from './loc';
import { isMobile, isLandscape, isTablet } from '../../../utils';
import { inject, observer } from 'mobx-react';
import { GroupChoiceProps } from './typings';
import { CommonStores } from '../../../types/commonStores';
// import { routes } from '../routes';
import { Controll, Filter } from '../Filter';
import './styles.styl';
import { Navlinks } from '../../../components/Header/HeaderContent/navlinks';
import { PopUp } from '../../../containers/Popup';

@inject<CommonStores, GroupChoiceProps, {}, unknown>(({order, app, filterStore, user, garments:
  { Subgroups, garments } }) => {
    return {
        userStore: user,
        activeGarments: [...garments!.activeGarments],
        subgroupsStore: new Subgroups('shirt'),
        app,
        filterStore,
        orderStore: order,
    };
})
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
        const backButtonElement = document.querySelector<HTMLButtonElement>('.button.back-button');
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
        const {
            modalIsOpen,
            showFilterBtn,
        } = this.state;
        const {
            match: { params: { garment, subgroup, group } },
            order,
            // backLink,
            lang,
            subgroupsStore,
            // orderStore,
            userStore,
            activeGarments
        } = this.props;
        // let itemsWithOwnFabric: Subgroup[] = [];
        // if (subgroupsStore!.data) {
        //     itemsWithOwnFabric = subgroupsStore!.data.design
        //       .filter((s) => s.is_allowOwnFabric);
        // }

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

        const content = (
          <>
                <span className="custom__content">
                    {isMobile() ?
                      <Navlinks
                        garment={activeGarments && activeGarments[0] || 'shirt'}
                        isAuth={userStore!.isAuth}
                        lang={'ru'}
                      /> : <>
                    <span className="custom__name">{subgroupsStore!.data
                      ? subgroupsStore!.data[subgroup]
                        .find((item: Subgroup) => item.subsection_our_code === group).title[lang]
                      : ''}:</span>
                          <span className="custom__status">{itemValue}</span>
                      </>}

                </span>
              {(subgroup === 'fitting') || (subgroup === 'design') && <span className="custom__control"/>}
          </>
        );

        // const partOfShirtToggleItems = [
        //     {
        //         subsection_our_code: 'all',
        //         title: { en: 'all', ru: 'все' },
        //     },
        //     ...itemsWithOwnFabric,
        // ];

        // const toggle = (
        //   <div className="toggle toggle-wrap">
        //       {partOfShirtToggleItems.map((item) => (
        //         <span key={item.subsection_our_code} className="toggle__item">
        //                 <input
        //                   className="toggle__input"
        //                   type="radio"
        //                   name="allowed_own_fabric"
        //                   id={item.subsection_our_code}
        //                   value={item.subsection_our_code}
        //                   checked={orderStore!.partOfShirtToggle === item.subsection_our_code}
        //                   onChange={this.handleChange}
        //                 />
        //                 <label className="toggle__label" htmlFor={item.subsection_our_code}>
        //                     {loc[lang].for} {item.title[lang]}
        //                 </label>
        //             </span>
        //       ))}
        //   </div>
        // );

        // const isToggleOnSeparateRow = (isTablet() && !isLandscape());

        return (
          <>
              <>
                  <div className="custom custom--open" style={{overflow: 'hidden', cursor: 'unset'}}>
                      {content}
                      {/*{!isToggleOnSeparateRow && this.props.app && !this.props.app.isSearchBarOpened}*/}
                          <div
                              className="custom__control_new"
                          >
                              <form
                                  style={{
                                      cursor: 'pointer',
                                      transition: '0.3s',
                                      transform: this.props.app && this.props.app.isSearchBarOpened ?
                                          'unset' : isMobile() ? 'translateX(60%)' : 'translateX(74%)'
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
                                            if ( group !== 'fabric') {
                                                return;
                                            }
                                            this.props.app!.toggleIsSearchBarOpened();
                                            if (this.props.filterStore!.isOpen) {
                                                this.props.filterStore!.toggleOpen();
                                            }
                                            if ( isMobile() ) {
                                                this.setState({showFilterBtn: !showFilterBtn});
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
                                              if ( isMobile() ) {
                                                  this.setState({showFilterBtn: !showFilterBtn});
                                              }
                                          }}
                                          style={{
                                              width: '30px'
                                          }}
                                      />
                                  </div>
                              </form>
                              { (isMobile() && showFilterBtn) && (
                                <Controll disableBtn={group !== 'fabric'} openModal={this.openModal}/>
                              )}
                              { !isMobile() && (
                                <Controll openModal={this.openModal}/>
                              )}
                          </div>
                  </div>
                  {/*{isToggleOnSeparateRow && this.props.withToggle && subgroup !== 'fitting'*/}
                  {/*&& subgroup !== 'design'}*/}

                  {modalIsOpen && (
                    <PopUp open={modalIsOpen} onClose={this.closeModal}>
                        <Filter onClose={this.closeModal}/>
                    </PopUp>
                  )}
              </>
              {/* {subgroup === 'fitting' ?
                    <Link to={backLink}  className="custom custom--openss">
                        {content}
                    </Link> :
                    <Link to={backLink} onClick={this.backClick} className="custom custom--openss">
                        {content}
                    </Link>} */}
          </>
        );
    }
}

export {
    GroupChoice,
};
