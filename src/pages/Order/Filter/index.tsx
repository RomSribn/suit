import * as React from 'react';
import { observer, inject } from 'mobx-react';
import { FilterComponent } from './Filter';
import { Controll as ControllComponent } from './Controll';

@inject(({ filterStore, app }) => ({
    isOpen: filterStore.isOpen,
    lang: app.lang,
    filters: filterStore.filters,
    filterStore: filterStore,
}))
@observer
class Filter extends React.Component<_FilterProps> {
    render() {
        const {
            isOpen,
            filters,
            lang,
            filterStore
        } = this.props;
        return (
            <FilterComponent
                lang={lang!}
                isOpen={isOpen!}
                filters={filters!}
                filterStore={filterStore}
            />
        );
    }
}

@inject(({ filterStore }) => ({
    filterStore: filterStore,
    isOpen: filterStore.isOpen,
    toggleOpen: filterStore.toggleOpen,
    closeFilter: filterStore.closeFilter,
}))
@observer
class Controll extends React.Component<_ControllProps> {
    componentWillUnmount() {
        const props = this.props;
        if (props.filterStore) {
            props.filterStore.closeFilter();
            props.filterStore.clearFilters();
            props.filterStore.clearUserFilters();
        }
    }
    render() {
        const {
            isOpen,
            toggleOpen,
            type,
            filterStore
        } = this.props;
        return (
            <ControllComponent
                filterStore={filterStore}
                isOpen={isOpen!}
                onCLick={toggleOpen!}
                type={type!}
            />);
    }
}

export {
    Filter,
    Controll,
};