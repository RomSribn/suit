interface Locale {
    back: string;
    add: string;
}

const makeLocale: MakeLocale<Locale> = () => ({
    en: {
        back: 'back',
        add: 'add',
        create: 'to fitting',
        save: 'save'
    },
    ru: {
        back: 'назад',
        add: 'добавить',
        create: 'на примерку',
        save: 'сохранить'
    },
});

const loc = makeLocale();

export {
    loc,
};