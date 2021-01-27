import * as React from 'react';
import * as classNames from 'classnames';
import Select from 'react-select';

type filterTypes = 'input' | 'date' | 'select' | 'empty';

interface FilterParams {
  text: string;
  allStatusesText: string;
  type?: filterTypes;
  selectValeus?: string[];
}

function filterFabric(params: FilterParams) {
  // tslint:disable-line no-any
  return (props: any) => {
    // tslint:disable-line no-any
    const onChange = props.onChange;
    const baseClass = 'orders__title';
    if (params.type === 'select') {
      const selectValues = params.selectValeus || [];
      const options = selectValues.map((value) => ({ value, label: value }));
      return (
        <div className={classNames(baseClass, baseClass + '--filter')}>
          <Select
            options={[{ value: '', label: params.allStatusesText }, ...options]}
            onChange={({ value }: any) => onChange(value)} // tslint:disable-line no-any
            placeholder={params.text}
            isClearable={false}
            isSearchable={false}
            className="select-wrapper"
            classNamePrefix="react-select"
          />
        </div>
      );
    }

    return (
      <div className={classNames('orders__title', 'orders__title--filter')}>
        <input
          className="orders__input"
          onChange={(event) => onChange(event.target.value)}
          type="text"
          placeholder={params.text}
        />
      </div>
    );
  };
}

export { filterFabric };
