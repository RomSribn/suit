
interface Locale {
    back: string;
    create: string;
    save: string;
    update: string;
    repeat: string;
    errorMessage: string;
    okay: string;
    oops: string;
    
}

const makeLocale = (): Translations<Locale> => ({
    en: {
        back: 'back',
        create: 'to fitting',
        save: 'save',
        update: 'update',
        repeat: 'repeat',
        errorMessage: 'Something\'s wrong. We recommend to try again.',
        okay: 'ok',
        oops: 'Oops',
    },
    ru: {
        back: 'назад',
        create: 'на примерку',
        save: 'сохранить',
        update: 'обновить',
        repeat: 'повторить',
        errorMessage: 'Что-то пошло не так. Рекомендуем повторить действие!',
        okay: 'хорошо',
        oops: 'Упс',
    },
});

const loc = makeLocale();

export {
    loc,
};