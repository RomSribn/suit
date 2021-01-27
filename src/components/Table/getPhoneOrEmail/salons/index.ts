import { Columns, TableDataItemStringFields } from '../../index';
import { CellInfo, FilterRender } from 'react-table';

type TableRawData = {
  accessor: TableDataItemStringFields;
  Filter: FilterRender;
  filterable: boolean;
  filterMethod: (
    filter: { id: string; value: string; [key: string]: string },
    row: { date: string | { [key: string]: string & { name: string } } },
  ) => boolean;
  Cell: (props: CellInfo) => JSX.Element;
};

type GetPhoneOrEmailParameters = {
  columnsText: Record<Columns, string>;
  cell: TableRawData['Cell'];
  filterMethod: (
    filter: { id: string; value: string; [key: string]: string },
    row: { date: string | { [key: string]: string & { name: string } } },
  ) => boolean;
  show: boolean;
};

export type GetPhoneOrEmail = (data: GetPhoneOrEmailParameters) => TableRawData;

let getPhoneOrEmail: GetPhoneOrEmail = (() =>
  ({} as TableRawData)) as GetPhoneOrEmail;

const salon = process.env.SALON_ID;

switch (salon) {
  case 'gasuits': {
    getPhoneOrEmail = require('./gasuits').getPhone;
    break;
  }
  case 'mysuit': {
    getPhoneOrEmail = require('./mysuit').getEmail;
    break;
  }
  case 'kalasova': {
    getPhoneOrEmail = require('./kalasova').getPhone;
    break;
  }

  case 'suit': {
    getPhoneOrEmail = require('./suit').getPhone;
    break;
  }

  default: {
    throw new Error(
      'getPhoneOrEmail should be provided at component/Table/getPhoneOrEmail',
    );
  }
}

export { getPhoneOrEmail };
