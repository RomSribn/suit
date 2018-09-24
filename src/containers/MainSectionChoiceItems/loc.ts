interface Locale {
    clear: string;
}

const makeLocale: MakeLocale<Locale> = () => ({
    en: {
        clear: 'clear'
    },
    ru: {
        clear: 'очистить'
    },
});

const loc = makeLocale();

export {
    loc,
};