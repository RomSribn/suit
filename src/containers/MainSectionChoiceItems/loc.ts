interface Locale {
    clear: string;
    noStatus: string;
}

const makeLocale: MakeLocale<Locale> = () => ({
    en: {
        clear: 'clear',
        noStatus: 'not chosen'
    },
    ru: {
        clear: 'очистить',
        noStatus: 'не выбрано'
    },
});

const loc = makeLocale();

export {
    loc,
};