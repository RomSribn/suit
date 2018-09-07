interface Locale {
    choiceText: {
        first: string;
        second: string;
    };
    submit: string;
    pathItemValue: string;
}

const makeLocale: MakeLocale<Locale> = () => ({
    en: {
        choiceText: {
            first: 'Choose garments you need and press Submit button.',
            second: 'It will let you set every garment up'
        },
        submit: 'submit',
        pathItemValue: 'garments',
    },
    ru: {
        choiceText: {
            first: 'Выберите необходимые изделия и нажмите кнопку принять.',
            second: 'Это позволит вам настроить каждую часть изделия.',
        },
        submit: 'принять',
        pathItemValue: 'изделия',
    },
});

const loc = makeLocale();

export {
    loc,
};