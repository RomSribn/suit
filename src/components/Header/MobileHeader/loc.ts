interface Translations {
    fabric: string;
    design: string;
    fitting: string;
}

const mobileHeaderTranslations: Record<Lang, Translations> = {
    ru: {
        fabric: 'ткань',
        design: 'дизайн',
        fitting: 'мерки',
    },
    en: {
        fabric: 'fabric',
        design: 'design',
        fitting: 'fitting',
    },
};

export {
    mobileHeaderTranslations,
};
