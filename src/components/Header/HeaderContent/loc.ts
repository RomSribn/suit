type Loc = {
    order: string
    cloth: string
    design: string
    metrics: string
};

const loc: MakeLocale<Loc> = {
    en: {
        order: 'order',
        cloth: 'cloth',
        design: 'design',
        metrics: 'metrics'
    },
    ru: {
        order: 'заказы',
        cloth: 'ткань',
        design: 'дизайн',
        metrics: 'мерки'
    },
};

export {
    loc,
};