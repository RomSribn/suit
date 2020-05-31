interface Translations {
    fabric: string;
    design: string;
    fitting: string;
    orderList: string;
}

const mobileHeaderTranslations: Record<Lang, Translations> = {
    ru: {
        fabric: 'ткань',
        design: 'дизайн',
        fitting: 'мерки',
        orderList: 'заказы',
    },
    en: {
        fabric: 'fabric',
        design: 'design',
        fitting: 'fitting',
        orderList: 'orders',
    },
};

export {
    mobileHeaderTranslations,
};
