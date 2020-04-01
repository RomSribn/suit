import * as React from 'react';
import { Filter } from '../../../Filter';
import { GetPhoneOrEmail } from '../index';

export const getPhone: GetPhoneOrEmail = ({columnsText, cell, filterMethod}) => ({
    accessor: 'phone',
    Filter: ({ onChange }) => <Filter text={columnsText.phone} onChange={onChange} />,
    filterable: true,
    filterMethod,
    Cell: cell
});
