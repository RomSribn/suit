import * as React from 'react';
import * as classNames from 'classnames';

type filterTypes = 'input' | 'date' | 'select' | 'empty';

interface FilterParams {
    text: string;
    type?: filterTypes;
    selectValeus?: string[];
}

function filterFabric(params: FilterParams) { // tslint:disable-line no-any
    return (props: any) => { // tslint:disable-line no-any
        const onChange = props.onChange;
        const baseClass = 'orders__title';
        const filter = props.filter;
    
        if (params.type === 'select') {
            const selectValues = params.selectValeus || [];
            return (
                <div
                    className={classNames(baseClass, baseClass + '--filter')}
                >
                    <div>
                        <select
                            className="wrapper-dropdown"
                            onChange={event => onChange(event.target.value)}
                            value={filter ? filter.value : 'all'}
                        >
                            <option selected={true} value=""> -- {params.text} -- </option>
                            {selectValues.map(val => <option key={val} value={val}>{val}</option>)}
                        </select>
                    </div>
                </div>
            );
        }
    
        return (
        <div className={classNames('orders__title', 'orders__title--filter')}>
            <input
                className="orders__input"
                onChange={event => onChange(event.target.value)}
                type="text"
                placeholder={params.text}
            />
        </div>
        );
    };
}

export {
    filterFabric
};