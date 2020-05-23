import * as React from 'react';
import { Filter } from '../../../Filter';
import { GetPhoneOrEmail } from '../index';

export const getPhone: GetPhoneOrEmail = ({columnsText, cell, filterMethod, show}) => ({
    accessor: 'phone',
    Filter: ({ filter, onChange }) => (
        <Filter
            text={columnsText.phone}
            inputValue={filter && filter.value || ''}
            onChange={onChange}
        />),
    filterable: true,
    filterMethod,
    Cell: cell,
    show,
});
