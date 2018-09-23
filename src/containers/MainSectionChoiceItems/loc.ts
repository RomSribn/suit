interface Locale {
    clear: string;
}

const makeLocale: MakeLocale<Locale> = () => ({
    en: {
        clear: 'clear'
    },
    ru: {
        clear: 'отчистить'
    },
});

const loc = makeLocale();

export {
    loc,
};