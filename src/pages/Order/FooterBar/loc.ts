interface Locale {
    back: string;
    add: string;
}

const makeLocale: MakeLocale<Locale> = () => ({
    en: {
        back: 'back',
        add: 'add',
    },
    ru: {
        back: 'назад',
        add: 'выбрать',
    },
});

const loc = makeLocale();

export {
    loc,
};