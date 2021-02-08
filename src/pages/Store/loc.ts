interface Loc {
    submitBtn: string;
    dropMsg: string;
}

const makeLoc: MakeLocale<Loc> = () => ({
    en: {
        submitBtn: 'request a price',
        dropMsg: 'drop here...',
    },
    ru: {
        submitBtn: 'запросить стоимость',
        dropMsg: 'загрузить...',
    },
});

const loc = makeLoc();

export { loc };
