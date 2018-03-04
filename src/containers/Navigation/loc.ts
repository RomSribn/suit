interface Locale {
    navigation: {
        order: string;
        panel: string;
        clientele: string;
        orders: string;
        calendar: string;
        tasks: string;
        analytics: string;
        settings: string;
    };
    hideShow: string;
}
const makeLocale: MakeLocale<Locale> = () => ({
    en: {
       navigation: {
        order: 'order',
        panel: 'panel',
        clientele: 'clients',
        orders: 'order list',
        calendar: 'calendar',
        tasks: 'tasks',
        analytics: 'analytics',
        settings: 'settings',
       },
        hideShow: 'Hide/show element',
    },
    ru: {
        navigation: {
            order: 'заказать',
            panel: 'панель',
            clientele: 'клиенты',
            orders: 'заказы',
            calendar: 'календарь',
            tasks: 'задачи',
            analytics: 'аналтика',
            settings: 'настройки',
        },
        hideShow: 'Скрыть/показать элемент',
    },
});
const loc = makeLocale();

export {
    loc
};