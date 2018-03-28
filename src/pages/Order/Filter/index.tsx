import * as React from 'react';
import { observer, inject } from 'mobx-react';
import { Filter as FilterComponent } from './Filter';
import { Controll as ControllComponent } from './Controll';

const defaultFilter = [
    {
        name: { en: 'purpose', ru: 'назначение'},
        values: [
            {en: 'classic', ru: 'классический'},
            {en: 'ceremonail', ru: 'церемониальный'}
        ]
    },
    
    {
        name: { en: 'cutting', ru: 'крой'},
        values: [
            {en: 'single-breasted', ru: 'однобортный'},
            {en: 'double-breasted', ru: 'двубортный'}, {en: 'tail-coat', ru: 'фрак'}
        ]
    },
    
    {
        name: { en: 'count of buttons', ru: 'количество пуговиц'},
        values: [
            {en: '1', ru: '1'},
            {en: '2', ru: '2'},
            {en: '3', ru: '3'},
            {en: '5', ru: '5'},
            {en: '6', ru: '6'},
            {en: '8', ru: '8'}
        ]
    },
    
    {
        name: { en: 'lapel width', ru: 'ширина лацкана'},
        values: [
            {en: '6', ru: '6'},
            {en: '7,5', ru: '7,5'},
            {en: '8', ru: '8'},
            {en: '9', ru: '9'}
        ]
    },
    
    {
        name: { en: 'lapel shape', ru: 'форма лацкана'},
        values: [
            {en: 'notch', ru: 'прямоугольный'},
            {en: 'peack', ru: 'заостренный'}
        ]
    }
];

@inject(({ filterStore, app }) => ({
    isOpen: filterStore.isOpen,
    lang: app.lang,
    filterGroups: filterStore.filterGroups,
}))
@observer
class Filter extends React.Component<_FilterProps> {

    render() {
        const {
            isOpen,
            filterGroups,
            lang,
        } = this.props;
        const filt = defaultFilter.map(f => ({
            name: f.name[lang!],
            filters: f.values.map(v => ({
                name: v[lang!],
                label: v[lang!],
                value: v[lang!],
            }))
        }));
        return (<FilterComponent isOpen={isOpen!} filterGroups={filterGroups! || filt} />);
    }
}

@inject(({ filterStore }) => ({
    isOpen: filterStore.isOpen,
    toggleOpen: filterStore.toggleOpen,
    closeFilter: filterStore.closeFilter,    
}))
@observer
class Controll extends React.Component<_ControllProps> {
    componentWillUnmount() {
        this.props.closeFilter!();
    }
    render() {
        const {
            isOpen,
            toggleOpen,
            type,
        } = this.props;
        return (<ControllComponent isOpen={isOpen!} onCLick={toggleOpen!} type={type!} />);
    }
}

export {
    Filter,
    Controll,
};