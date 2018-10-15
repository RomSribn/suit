import { Columns } from './index';

type ConfirmActionTextParams = Record<'currentStatus' | 'nextStatus', string>;

type Loc = {
    /** Наименовая колонок отоборажения */
    columns:  Record<Columns, string>;
    /** Наименования статусов, доступных для фильтрации */
    statuses: Record<OrderStatus | 'ALL_STATUSES', string>;
    from: string;
    till: string;
    clear: string;
    submit: string;
    months: string[];
    weekDaysShort: string[];
    /**
     * Возвращает строку вида "перевести заказ из статуса {params.currentStatus} в {params.nextStatus}"
     */
    confirmActionTextFabric(params: ConfirmActionTextParams): string;
};

const loc: Translations<Loc> = {
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
        },
        confirmActionTextFabric: (params) =>
            `change an order from the
            status "${params.currentStatus}" to the status "${params.nextStatus}"`,
        from: 'From',
        till: 'Till',
        clear: 'CLEAR',
        submit: 'SUBMIT',
        months: [
            'January',
            'February',
            'March',
            'April',
            'May',
            'June',
            'July',
            'August',
            'September',
            'October',
            'November',
            'December',
        ],
        weekDaysShort: ['SUN', 'MON', 'TU', 'WED', 'TH', 'FR', 'SAT']
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
        },
        confirmActionTextFabric: (params) =>
            `перевести заказ из статуса "${params.currentStatus}" в статус "${params.nextStatus}"`,
        from: 'От',
        till: 'До',
        clear: 'ОТЧИСТИТЬ',
        submit: 'ПРИМЕНИТЬ',
        months: [
            'Январь',
            'Февраль',
            'Март',
            'Апрель',
            'Май',
            'Июнь',
            'Июль',
            'Август',
            'Сентябрь',
            'Октябрь',
            'Ноябрь',
            'Декабрь',
        ],
        weekDaysShort: ['ВС', 'ПН', 'ВТ', 'СР', 'ЧТ', 'ПТ', 'СБ']
    }
};

export { loc };
