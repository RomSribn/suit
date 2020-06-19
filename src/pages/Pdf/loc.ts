interface Locale {
    name: string;
    phone: string;
    email: string;
    orderId: string;
    date: string;
    price: string;
    general: string;
    fabric: string;
    fitting: string;
}

const makeLocale: MakeLocale<Locale> = () => ({
    en: {
        name: 'name',
        phone: 'phone',
        email: 'email',
        orderId: 'order id',
        date: 'delivery date',
        price: 'price',
        general: 'general info',
        fabric: 'fabric',
        fitting: 'fitting',
    },
    ru: {
        name: 'ФИО',
        phone: 'телефон',
        email: 'электронная почта',
        orderId: 'номер заказа',
        date: 'дата доставки',
        price: 'стоимость заказа',
        general: 'общие данные',
        fabric: 'ткань',
        fitting: 'мерки',
    },
});

const loc = makeLocale();

export {
    loc,
};