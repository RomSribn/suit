import * as moment from 'moment';
import { TableData } from '../../components/Table';

type PrepareTableData = (
  orders: OrderList.OrderItem[],
  lang: string,
) => TableData;

const prepareTableData: PrepareTableData = (orders, lang) => {
  return orders.map((order) => ({
    id: order.orderId.toString(),
    name: (order.customer && order.customer.name) || '',
    fitting: 'First',
    phone: (order.customer && order.customer.phone) || '',
    status: order.status,
    date: moment(order.date).format('DD/MM/YYYY'),
    email: (order.customer && order.customer.email) || '',
    isConfirmed: (order.customer && order.customer.isConfirmed) || false,
    customerId: order.customer && order.customer.id,
  }));
};

export { prepareTableData };
