
interface Locale {
    back: string;
    create: string;
    save: string;
    update: string;
    repeat: string;
    errorMessage: string;
    okay: string;
    oops: string;
    done: string;
    header: string;
    thanksText: string;
}

const makeLocale = (): Translations<Locale> => ({
    en: {
        back: 'back',
        create: 'send',
        save: 'next',
        update: 'update',
        repeat: 'repeat',
        errorMessage: 'Something\'s wrong. We recommend to try again.',
        okay: 'ok',
        oops: 'Oops',
        done: 'done',
        header: 'Stylist consultation',
        thanksText: 'Thank you! We have received your data. Our stylist will contact you.',
    },
    ru: {
        back: 'вернуться',
        create: 'отправить',
        save: 'дальше',
        update: 'обновить',
        repeat: 'повторить',
        errorMessage: 'Что-то пошло не так. Рекомендуем повторить действие!',
        okay: 'хорошо',
        oops: 'Упс',
        done: 'готово',
        header: 'Консультация стилиста',
        thanksText: 'Спасибо, получили ваши данные. В ближайшее время с вами свяжется наш стилист.',
    },
});

const loc = makeLocale();

export {
    loc,
};