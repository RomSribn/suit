import * as React from 'react';
import { observer, inject } from 'mobx-react';
import { FilterComponent } from './Filter';
import { Controll as ControllComponent } from './Controll';

@inject(
  ({
    filterStore,
    app: { lang },
    garments: { currentActiveGarment },
    order: { activeElement },
  }) => ({
    isOpen: filterStore.isOpen,
    lang,
    filters: filterStore.filters,
    filterStore: filterStore,
    userFilters: filterStore.userFilters,
    currentActiveGarment:
      activeElement &&
      activeElement.elementInfo &&
      activeElement.elementInfo.garment,
  }),
)
@observer
class Filter extends React.Component<_FilterProps> {
  render() {
    const {
      isOpen,
      filters,
      lang,
      filterStore,
      onClose,
      userFilters,
      currentActiveGarment,
    } = this.props;
    return (
      <FilterComponent
        lang={lang!}
        isOpen={isOpen!}
        filters={filters!}
        filterStore={filterStore}
        userFilters={userFilters}
        onClose={onClose!}
        currentActiveGarment={currentActiveGarment}
      />
    );
  }
}

@inject(({ filterStore, app }) => ({
  filterStore: filterStore,
  isOpen: filterStore.isOpen,
  toggleOpen: filterStore.toggleOpen,
  closeFilter: filterStore.closeFilter,
  isSearchBarOpened: app.isSearchBarOpened,
  toggleIsSearchBarOpened: app.toggleIsSearchBarOpened,
}))
@observer
class Controll extends React.Component<_ControllProps> {
  closeFilter = () => {
    const props = this.props;
    if (props.filterStore) {
      props.filterStore.closeFilter();
      props.filterStore.clearFilters();
      props.filterStore.clearUserFilters();
    }
  };

  componentDidMount() {
    const props = this.props;

    setTimeout(() => {
      if (props.filterStore) {
        props.filterStore.closeFilter();
      }
    }, 5000);
  }

  componentWillUnmount() {
    if (this.props.isClearFilters) {
      this.closeFilter();
    }
  }

  render() {
    const {
      isOpen,
      openModal,
      toggleOpen,
      type,
      filterStore,
      isSearchBarOpened,
      toggleIsSearchBarOpened,
      disableBtn,
      isFabric,
    } = this.props;
    return (
      <ControllComponent
        isFabric={isFabric}
        isSearchBarOpened={isSearchBarOpened!}
        filterStore={filterStore}
        isOpen={isOpen!}
        onCLick={toggleOpen}
        toggleIsSearchBarOpened={toggleIsSearchBarOpened!}
        type={type!}
        openModal={openModal}
        disableBtn={disableBtn}
      />
    );
  }
}

export { Filter, Controll };
