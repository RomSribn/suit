interface Locale {
    choiceText: {
        first: string;
        second: string;
    };
    submit: string;
}

const makeLocale: MakeLocale<Locale> = () => ({
    en: {
        choiceText: {
            first: 'Choose garments you need and press Submit button.',
            second: 'It will let you set every garment up'
        },
        submit: 'submit',
    },
    ru: {
        choiceText: {
            first: 'Выберите необходимые изделия и нажмите кнопку принять.',
            second: 'Это позволит вам настроить каждую часть изделия.',
        },
        submit: 'принять',
    },
});

const loc = makeLocale();

export {
    loc,
};