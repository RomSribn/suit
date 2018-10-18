type Actions = 'back' | 'create' | 'save' | 'update';
type Locale = Record<Actions, string>;

const makeLocale = (): Translations<Locale> => ({
    en: {
        back: 'back',
        create: 'to fitting',
        save: 'save',
        update: 'update'
    },
    ru: {
        back: 'назад',
        create: 'на примерку',
        save: 'сохранить',
        update: 'обновить'
    },
});

const loc = makeLocale();

export {
    loc,
};