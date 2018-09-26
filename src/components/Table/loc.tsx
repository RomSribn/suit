import { Columns, OrderStatus } from './index';

type Loc = {
    columns:  Record<Columns, string>;
    statuses: Record<OrderStatus | 'ALL_STATUSES', string>;
};

const loc: MakeLocale<Loc> = {
    en: {
        columns: {
            order: ' Order',
            name: 'Name',
            fitting: 'fitting',
            phone: 'Phone',
            status: 'Status',
            date: 'date'
        },
        statuses: {
            TEMPORARY: 'Temporary',
            NEW: 'New',
            IN_PROGRESS: 'In progress',
            DONE: 'Done',
            ALL_STATUSES: 'All statuses'
        }
    },
    ru: {
        columns: {
            order: 'Номер заказа',
            name: 'ФИО',
            fitting: 'примерка',
            phone: 'Телефон',
            status: 'Статус',
            date: 'дата'
        },
        statuses: {
            TEMPORARY: 'Временный',
            NEW: 'Новый',
            IN_PROGRESS: 'В работе',
            DONE: 'Завершен',
            ALL_STATUSES: 'Все статусы'
        }
    }
};

export { loc };