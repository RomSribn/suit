type Loc = {
    order: string;
};

const loc: MakeLocale<Loc> = {
    en: {
        order: 'order',
    },
    ru: {
        order: 'заказы',
    },
};

export {
    loc,
};