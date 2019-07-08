import * as React from 'react';
import { Filter } from '../../../Filter';
import { GetPhoneOrEmail } from '../index';

export const getPhone: GetPhoneOrEmail = ({columnsText, cell, filterMethod}) => ({
    accessor: 'phone',
    Filter: () => <Filter text={columnsText.phone} />,
    filterable: true,
    filterMethod,
    Cell: cell
});
