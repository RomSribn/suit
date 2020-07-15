import * as React from 'react';
import { observer, inject } from 'mobx-react';
import { FilterComponent } from './Filter';
import { Controll as ControllComponent } from './Controll';
import { size,  keys, sum } from 'lodash';

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

@inject(({ filterStore, app }) => ({
    filterStore: filterStore,
    isOpen: filterStore.isOpen,
    toggleOpen: filterStore.toggleOpen,
    closeFilter: filterStore.closeFilter,
    lang: app.lang,
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
    }

    componentDidMount() {
        const props = this.props;

        setTimeout(() => {
            if (props.filterStore) {
                props.filterStore.closeFilter();
            }
        }, 5000);
    }

    componentWillUnmount() {
        this.closeFilter();
    }
    render() {
        const {
            isOpen,
            toggleOpen,
            type,
            filterStore,
            lang,
        } = this.props;
        const filterCount = filterStore && sum(
            keys(filterStore.userFilters)
                .map((key: string) => size(filterStore.userFilters[key]))
        );

        return (
            <ControllComponent
                filterStore={filterStore}
                isOpen={isOpen!}
                onCLick={toggleOpen!}
                type={type!}
                lang={lang}
                filterCount={filterCount}
            />);
    }
}

export {
    Filter,
    Controll,
};