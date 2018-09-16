import * as moment from 'moment';
import { TableData } from '../../components/Table';
import { loc as TLoc } from '../../components/Table/loc';

type PrepareTableData = (orders: OrderList.OrderItem[], lang: string) => TableData;

const prepareTableData: PrepareTableData = (orders, lang) => {
    return orders.map(order => ({
        order: order.orderId.toString(),
        name: order.customer.name,
        fitting: 'First',
        phone: order.customer.phone,
        status: TLoc[lang].statuses[order.status.name],
        date: moment(order.date).format('DD/MM/YYYY')
    }));
};

export {
    prepareTableData
};