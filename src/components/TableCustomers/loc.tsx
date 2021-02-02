import { Columns } from './index';

type Loc = {
  /** Наименования колонок отображения */
  columns: Record<Columns, string>;
  search: string;
};

const loc: Translations<Loc> = {
  en: {
    columns: {
      lastOrderId: 'Last order',
      name: 'Name',
      phone: 'Phone',
      email: 'Email',
      password: 'Password',
    },
    search: 'Search ...',
  },
  ru: {
    columns: {
      lastOrderId: 'Последний заказ',
      name: 'ФИО',
      phone: 'Телефон',
      email: 'Email',
      password: 'Пароль',
    },
    search: 'Поиск ...',
  },
};

export { loc };
