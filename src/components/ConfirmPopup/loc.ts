type TextFields = 'confirm' | 'back' | 'confirmText' | 'defaultActionText';

type Locale = Record<TextFields, string>;

const loc: Translations<Locale> = {
    en: {
        confirm: 'confirm',
        confirmText: 'Do you realy want to ',
        back: 'back',
        defaultActionText: 'do it'
    },
    ru: {
        confirm: 'подвердить',
        confirmText: 'Вы действительно хотите ',
        back: 'назад',
        defaultActionText: 'сделать это'
    }
};

export {
    loc
};
