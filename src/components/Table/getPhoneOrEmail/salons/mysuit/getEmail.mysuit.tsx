import * as React from 'react';
import { Filter } from '../../../Filter';
import { GetPhoneOrEmail } from '../index';

export const getEmail: GetPhoneOrEmail = ({columnsText, cell, filterMethod}) => ({
    accessor: 'email',
    Filter: () => <Filter text={columnsText.email} />,
    filterable: true,
    filterMethod: filterMethod,
    Cell: cell
});
