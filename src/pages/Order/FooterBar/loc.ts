interface Locale {
    back: string;
    add: string;
}

const makeLocale: MakeLocale<Locale> = () => ({
    en: {
        back: 'back',
        add: 'add',
        save: 'save'
    },
    ru: {
        back: 'назад',
        add: 'добавить',
        save: 'сохранить'
    },
});

const loc = makeLocale();

export {
    loc,
};