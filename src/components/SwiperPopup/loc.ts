interface Locale {
    order: string;
    shirt: string;
    cloth: string;
    clothSelected: string;
    continue: string;
    currency: string;
}

export const loc: MakeLocale<Locale> = {
    en: {
        order: 'Order',
        shirt: 'Shirt',
        cloth: 'Cloth',
        clothSelected: 'cloth selected',
        continue: 'continue',
        currency: '€',
    },
    ru: {
        order: 'Заказать',
        shirt: 'Сорочка',
        cloth: 'Ткань',
        clothSelected: 'ткань выбрана',
        continue: 'продолжить',
        currency: '₽',
    },
};
