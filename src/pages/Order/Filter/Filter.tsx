import * as React from 'react';
import * as classnames from 'classnames';

import './styles.styl';

class FilterItem extends React.PureComponent<FilterItemProps> {
    static defaultProps: DefaultFilterItemProps = {
        type: 'checkbox',
        lang: 'ru',
        isColorGroup: false,
        group: '',
        addFilter: () => null,
        removeFilter: () => null,
    };

    onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const {
            value,
            addFilter,
            removeFilter,
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
            value,
            group,
            isColorGroup
        } = this.props;
        return (
            <label
                className={classnames('filter__label', { color: isColorGroup})}
            >
                <input
                    type={type!}
                    value={value}
                    name={group}
                    onChange={this.onChange}
                />
                { isColorGroup ?
                <span
                    className="filter__label color-value"
                    style={{ backgroundColor: value}}
                /> :
                <span className="filter__label-name">{valueTitle[lang!]}</span>
                }
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
        <div className="filter__group" key={title[lang]}>
            <div className="filter__groupheader">{title[lang]}:</div>
            <div className="filter__checkgroup">
                {values.map((value, index) => (
                    <FilterItem
                        lang={lang}
                        key={title[lang] + value.value + index}
                        addFilter={filterStore.addUserFilter(group.name)}
                        isColorGroup={group.name.includes('color')}
                        removeFilter={filterStore.removeUserFilter(group.name)}
                        valueTitle={value.valueTitle}
                        value={value.value}
                        group={group.name}
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
        lang: 'ru',
        onClose: () => null,
    };

    render() {
        const {
            filters,
            isOpen,
            lang,
            filterStore,
            onClose,
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
                <div
                  className={'filter-btn-wrap'}
                >
                    <button
                      onClick={() => {
                          if ( onClose ) {
                              onClose();
                          }
                      }}
                      className={'filter-button'}
                    >

                        Применить Фильтр
                    </button>
                </div>

            </div>
        );
    }
}

export {
    FilterComponent,
};
