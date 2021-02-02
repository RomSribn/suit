import { Columns } from './index';

type ConfirmActionTextParams = Record<'currentStatus' | 'nextStatus', string>;

type PanelRowControls =
  | 'call'
  | 'message'
  | 'create'
  | 'update'
  | 'edit'
  | 'delete'
  | 'pdf'
  | 'confirmCustomer';

type Loc = {
  /** Наименовая колонок отоборажения */
  columns: Record<Columns, string>;
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
  controls: Record<PanelRowControls, string>;
  isConfirmed: string;
  notConfirmed: string;
  confirmInfo: string;
  password: string;
  login: string;
  supportInfo: string;
  search: string;
  /**
   * Возвращает строку вида "создать профиль клиента {customerId}"
   */
  confirmCustomer(name: string | null): string;
};

const loc: Translations<Loc> = {
  en: {
    columns: {
      id: 'Order number',
      name: 'Name',
      isConfirmed: 'Confirmed',
      fitting: 'Fitting',
      phone: 'Phone',
      status: 'Status',
      date: 'date',
      email: 'Email',
    },
    statuses: {
      TEMPORARY: 'Temporary',
      NEW: 'New',
      IN_PROGRESS: 'In progress',
      DONE: 'Done',
      ALL_STATUSES: 'All statuses',
    },
    fabric: {
      delete: (orderId) => `delete ordere ${orderId}`,
      updateOrder: (params) =>
        `change an order from the
                status "${params.currentStatus}" to the status "${params.nextStatus}"`,
    },
    clear: 'clear',
    submit: 'submit',
    from: 'From',
    till: 'Till',
    controls: {
      call: 'Call',
      message: 'Message',
      create: 'Create based',
      update: 'Update status',
      edit: 'Edit',
      delete: 'Delete',
      pdf: 'PDF',
      confirmCustomer: 'Create customer profile',
    },
    isConfirmed: 'Yes',
    notConfirmed: 'No',
    confirmCustomer: (name: string) => `create customer profile ${name}`,
    confirmInfo:
      // tslint:disable-next-line:max-line-length
      'The client\'s username and password have been sent to your email address. If there is no message, check the "Spam" folder',
    password: 'Password',
    login: 'Login',
    supportInfo: 'Please, contact service support',
    search: 'Search ...',
  },
  ru: {
    columns: {
      id: 'Номер заказа',
      name: 'ФИО',
      isConfirmed: 'Подтвержден',
      fitting: 'Примерка',
      phone: 'Телефон',
      status: 'Статус',
      date: 'дата',
      email: 'Email',
    },
    statuses: {
      TEMPORARY: 'Временный',
      NEW: 'Новый',
      IN_PROGRESS: 'В работе',
      DONE: 'Завершен',
      ALL_STATUSES: 'Все статусы',
    },
    fabric: {
      delete: (orderId) => `удалить заказ ${orderId}`,
      updateOrder: (params) =>
        `перевести заказ из статуса "${params.currentStatus}" в статус "${params.nextStatus}"`,
    },
    clear: 'отчитсить',
    submit: 'отправить',
    from: 'От',
    till: 'До',
    controls: {
      call: 'Звонок',
      message: 'Сообщение',
      create: 'Создать на основе',
      update: 'Обновить статус',
      edit: 'Редактировать',
      delete: 'Удалить',
      pdf: 'PDF',
      confirmCustomer: 'Создать профиль клиента',
    },
    isConfirmed: 'Да',
    notConfirmed: 'Нет',
    confirmCustomer: (name: string) => `создать профиль клиента ${name}`,
    confirmInfo:
      'Отправили логин и пароль клиента Вам на почту. Возможно, письмо попало в "Спам".',
    password: 'Пароль',
    login: 'Логин',
    supportInfo: 'Пожалуйста, обратитесь в поддержку сервиса',
    search: 'Поиск ...',
  },
};

export { loc };
