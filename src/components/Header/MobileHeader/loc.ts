interface Translations {
  fabric: string;
  design: string;
  fitting: string;
  orderList: string;
  customersList: string;
}

const mobileHeaderTranslations: Record<Lang, Translations> = {
  ru: {
    fabric: 'ткань',
    design: 'дизайн',
    fitting: 'мерки',
    orderList: 'заказы',
    customersList: 'клиенты',
  },
  en: {
    fabric: 'fabric',
    design: 'design',
    fitting: 'fitting',
    orderList: 'orders',
    customersList: 'customers',
  },
};

export { mobileHeaderTranslations };
