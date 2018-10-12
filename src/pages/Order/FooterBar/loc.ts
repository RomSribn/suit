interface Locale {
    back: string;
    save: string;
}

const makeLocale: MakeLocale<Locale> = () => ({
    en: {
        back: 'back',
        create: 'to fitting',
        save: 'save',
    },
    ru: {
        back: 'назад',
        create: 'на примерку',
        save: 'сохранить',
    },
});

const loc = makeLocale();

export {
    loc,
};