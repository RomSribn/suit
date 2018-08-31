interface Locale {
    back: string;
    add: string;
}

const makeLocale: MakeLocale<Locale> = () => ({
    en: {
        back: 'back',
        add: 'add',
        create: 'create',
        save: 'save'
    },
    ru: {
        back: 'назад',
        add: 'добавить',
        create: 'создать',
        save: 'сохранить'
    },
});

const loc = makeLocale();

export {
    loc,
};