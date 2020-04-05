import * as React from 'react';
import { Filter } from '../../../Filter';
import { GetPhoneOrEmail } from '../index';

export const getEmail: GetPhoneOrEmail = ({columnsText, cell, filterMethod}) => ({
    accessor: 'email',
    Filter: ({ onChange }) => <Filter text={columnsText.email} onChange={onChange} />,
    filterable: true,
    filterMethod: filterMethod,
    Cell: cell
});
