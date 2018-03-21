interface Locale {
    emptyBlockMessage: string;
}

const makeLocale: MakeLocale<Locale> = () => ({
    en: {
        emptyBlockMessage: 'this section is empty yet'
    },
    ru: {
        emptyBlockMessage: 'эта секция еще не заполнена'
    },
});

const loc = makeLocale();

export {
    loc,
};