import * as React from 'react';
import { Filter } from '../../../Filter';
import { GetPhoneOrEmail } from '../index';

export const getEmail: GetPhoneOrEmail = ({columnsText, cell, filterMethod}) => ({
    accessor: 'email',
    Filter: ({ filter, onChange }) => (
        <Filter
            text={columnsText.email}
            inputValue={filter && filter.value || ''}
            onChange={onChange}
        />),
    filterable: true,
    filterMethod: filterMethod,
    Cell: cell
});
