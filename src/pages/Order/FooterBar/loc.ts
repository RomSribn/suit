
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
}

const makeLocale = (): Translations<Locale> => ({
    en: {
        back: 'back',
        create: 'send',
        save: 'save',
        update: 'update',
        repeat: 'repeat',
        errorMessage: 'Something\'s wrong. We recommend to try again.',
        okay: 'ok',
        oops: 'Oops',
        done: 'done',
    },
    ru: {
        back: 'назад',
        create: 'отправить',
        save: 'сохранить',
        update: 'обновить',
        repeat: 'повторить',
        errorMessage: 'Что-то пошло не так. Рекомендуем повторить действие!',
        okay: 'хорошо',
        oops: 'Упс',
        done: 'готово',
    },
});

const loc = makeLocale();

export {
    loc,
};