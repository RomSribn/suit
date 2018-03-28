import * as React from 'react';
import * as classnames from 'classnames';

class FilterItem extends React.PureComponent<FilterItemProps> {
    static defaultProps = {
        type: 'checkbox',
    };
    render() {
        const {
            name,
            type,
            label,
            value,
        } = this.props;
        return (
            <label className="filter__label">
                <input type={type} value={value} name={name} />
                <span className="filter__label-name">{label}</span>
            </label>
        );
    }
}
const makeFilterGroup = (group: FilterGroup) => {
    const {
        name,
        filters,
    } = group;
    return (
        <div className="filter__group">
            <div className="filter__groupheader">{name}:</div>
            <div className="filter__checkgroup">
                {filters.map(f => <FilterItem key={f.name + f.value} {...f} />)}
            </div>
        </div>
    );
};
class Filter extends React.PureComponent<FilterProps> {
    public static defaultProps: DefaultFilterProps = {
        filterGroups: [],
        isOpen: false,
    };
    render() {
        const {
            filterGroups,
            isOpen,
        } = this.props;
        return (
            <div
                className={classnames(
                    'filter',
                    { 'open': isOpen }
                )}
            >
                <div className="filter__wrap">
                {filterGroups.map(fg => makeFilterGroup(fg))}
                </div>
            </div>
        );
    }
}

export {
    Filter,
};
