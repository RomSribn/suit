
interface Locale {
    introText: {
        first: string;
        second: string;
    };
}
const makeLocale: MakeLocale<Locale> = () => ({
    en: {
        introText: {
            first: 'Choose garments you need and press Submit button.',
            second: 'It will let you set every garment up'
        },
    },
    ru: {
        introText: {
            first: 'Выберите необходимые изделия и нажмите кнопку принять.',
            second: 'Это позволит вам настроить каждую часть изделия.',
        },
    },
});
const loc = makeLocale();

export {
    loc
};