interface Locale {
    filters: string;
}

const makeLocale: MakeLocale<Locale> = () => ({
    en: {
        filters: 'filters'
    },
    ru: {
        filters: 'фильтры'
    },
});

const loc = makeLocale();

export {
    loc,
};