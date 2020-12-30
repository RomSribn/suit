import * as React from 'react';
import * as classnames from 'classnames';
import { isEqual, uniqBy } from 'lodash';

import './styles.styl';

class FilterItem extends React.PureComponent<FilterItemProps> {
    static defaultProps: DefaultFilterItemProps = {
        type: 'checkbox',
        lang: 'ru',
        isColorGroup: false,
        group: '',
        addFilter: () => null,
        removeFilter: () => null,
        removeUserGroupFilter: () => null,
        userFilters: {}
    };

    state = {
        checked: false
    };

    toggleChecked() {
        this.setState({ checked: !this.state.checked });
    }

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
        this.toggleChecked();
    }

    componentDidUpdate(prevProps: DefaultFilterItemProps) {
        if (!isEqual(prevProps, this.props)) {
            const { group, userFilters, value } = this.props;
            const isChecked = userFilters[group] && userFilters[group].find((item: string) => item === value);
            this.setState({ checked: isChecked });
        }
        return true;
    }

    componentDidMount() {
        const { group, userFilters, value } = this.props;
        const isChecked = userFilters[group] && userFilters[group].find((item: string) => item === value);
        this.setState({ checked: isChecked });
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
        const { checked } = this.state;
        return (
            <label
                className={classnames('filter__label', { color: isColorGroup })}
            >
                <input
                    type={type!}
                    value={value}
                    name={group}
                    onChange={this.onChange}
                    checked={checked}
                />
                { isColorGroup ?
                    <span
                        className="filter__label color-value"
                        style={{ backgroundColor: value }}
                    /> :
                    <span className="filter__label-name">{valueTitle[lang!]}</span>
                }
            </label>
        );
    }
}
const makeFilterGroup = (
    group: Filter,
    key: string,
    filterStore: IFilterStore,
    lang: string,
    removeUserGroupFilter: (value: string) => void,
    userFilters: UserFilters
) => {
    const {
        title,
        values,
    } = group;

    const uniqValues = uniqBy(values, 'value');

    const onCLick = () => {
        removeUserGroupFilter(key);
    };

    return (
        <div className="filter__group" key={title[lang]}>
            <div className="filter__groupheader">
                <span className="title">{title[lang]}:</span>
                {!!userFilters[key] && !!userFilters[key].length && (
                    <span
                        className="clear-btn"
                        onClick={onCLick}
                        onKeyDown={onCLick}
                        role="button"
                        tabIndex={0}
                        aria-pressed={false}
                    >
                        сбросить
                    </span>
                )}
            </div>
            <div className="filter__checkgroup">
                {uniqValues.map((value, index) => (
                    <FilterItem
                        lang={lang}
                        key={title[lang] + value.value + index}
                        addFilter={filterStore.addUserFilter(group.name)}
                        isColorGroup={group.name.includes('color')}
                        removeFilter={filterStore.removeUserFilter(group.name)}
                        valueTitle={value.valueTitle}
                        value={value.value}
                        group={group.name}
                        userFilters={userFilters}
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
            userFilters
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
                        .map((key, index) =>
                            makeFilterGroup(
                                filters[key],
                                key,
                                filterStore!,
                                lang,
                                filterStore!.removeUserGroupFilter,
                                userFilters!
                            ))}
                </div>
                <div
                    className={'filter-btn-wrap'}
                >
                    <button
                        onClick={() => {
                            if (onClose) {
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
