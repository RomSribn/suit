import { Columns } from './index';

type ConfirmActionTextParams = Record<'currentStatus' | 'nextStatus', string>;

type Loc = {
    /** Наименовая колонок отоборажения */
    columns:  Record<Columns, string>;
    /** Наименования статусов, доступных для фильтрации */
    statuses: Record<OrderStatus | 'ALL_STATUSES', string>;
    fabric: {

        /**
         * Возвращает строку вида "удалить заказ {orderId}"
         */
        delete(orderId: string): string;
        /**
         * Возвращает строку вида "перевести заказ из статуса {params.currentStatus} в {params.nextStatus}"
         */
        updateOrder(params: ConfirmActionTextParams): string;
    };
    clear: string;
    submit: string;
    from: string;
    till: string;
};

const loc: Translations<Loc> = {
    en: {
        columns: {
            order: ' Order',
            name: 'Name',
            fitting: 'Fitting',
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
        },
        fabric: {
            delete: (orderId) => `delete ordere ${orderId}`,
            updateOrder: (params) =>
                `change an order from the
                status "${params.currentStatus}" to the status "${params.nextStatus}"`
        },
        clear: 'clear',
        submit: 'submit',
        from: 'From',
        till: 'Till'
    },
    ru: {
        columns: {
            order: 'Номер заказа',
            name: 'ФИО',
            fitting: 'Примерка',
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
        },
        fabric: {
            delete: (orderId) => `удалить заказ ${orderId}`,
            updateOrder: (params) =>
            `перевести заказ из статуса "${params.currentStatus}" в статус "${params.nextStatus}"`
        },
        clear: 'отчитсить',
        submit: 'отправить',
        from: 'От',
        till: 'До'
    }
};

export { loc };
