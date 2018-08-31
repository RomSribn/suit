import * as React from 'react';
import * as classnames from 'classnames';

class FilterItem extends React.PureComponent<FilterItemProps> {
    static defaultProps: DefaultFilterItemProps = {
        type: 'checkbox',
        lang: 'ru',
        addFilter: () => null,
        removeFilter: () => null,
    };

    onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const {
            value,
            addFilter,
            removeFilter
        } = this.props;

        if (e.target.checked) {
            addFilter(value);
        } else {
            removeFilter(value);
        }
    }

    render() {
        const {
            valueTitle,
            lang,
            type,
            value
        } = this.props;
        return (
            <label className="filter__label">
                <input
                    type={type!}
                    value={value}
                    name={name}
                    onChange={this.onChange}
                />
                <span className="filter__label-name">{valueTitle[lang!]}</span>
            </label>
        );
    }
}
const makeFilterGroup = (group: Filter, filterStore: IFilterStore, lang: string) => {
    const {
        title,
        values,
    } = group;

    return (
        <div className="filter__group">
            <div className="filter__groupheader">{title[lang]}:</div>
            <div className="filter__checkgroup">
                {values.map((value, index) => (
                    <FilterItem
                        lang={lang}
                        key={title[lang] + value.value + index}
                        addFilter={filterStore.addUserFilter(group.name)}
                        removeFilter={filterStore.removeUserFilter(group.name)}
                        {...value}
                    />
                ))}
            </div>
        </div>
    );
};
class FilterComponent extends React.PureComponent<FilterProps> {
    public static defaultProps: DefaultFilterProps = {
        filters: {},
        isOpen: false,
        lang: 'ru'
    };
 
    render() {
        const {
            filters,
            isOpen,
            lang,
            filterStore
        } = this.props;
        return (
            <div
                className={classnames(
                    'filter',
                    { 'open': isOpen }
                )}
            >
                <div className="filter__wrap">
                {Object.keys(filters || {})
                .map((key, index) => makeFilterGroup(filters[key], filterStore!, lang))}
                </div>
            </div>
        );
    }
}

export {
    FilterComponent,
};
