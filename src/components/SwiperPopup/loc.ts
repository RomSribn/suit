interface Locale {
  order: string;
  shirt: string;
  cloth: string;
  clothSelected: string;
  designSelected: string;
  continue: string;
  currency: string;
  productInfo: string;
  manufacturer: string;
  fabricColor: string;
  pattern: string;
  weight: string;
  catalog: string;
  clothLeft: string;
  designLink: string;
}

export const loc: MakeLocale<Locale> = {
  en: {
    order: 'Order',
    shirt: 'Shirt',
    cloth: 'Cloth',
    designLink: 'Design',
    clothSelected: 'cloth selected',
    designSelected: 'Design selected',
    continue: 'continue',
    currency: '€',
    productInfo: 'Product info',
    manufacturer: 'Manufacturer:',
    fabricColor: 'Fabric color:',
    pattern: 'Pattern:',
    weight: 'Weight:',
    catalog: 'Catalog:',
    clothLeft: 'Cloth left: 22m',
  },
  ru: {
    order: 'Заказать',
    shirt: 'Сорочка',
    cloth: 'Ткань',
    designLink: 'Дизайн',
    clothSelected: 'ткань выбрана',
    designSelected: 'Дизайн выбран',
    continue: 'продолжить',
    currency: '₽',
    productInfo: 'Информация о товаре',
    manufacturer: 'Производитель:',
    fabricColor: 'Цвет ткани:',
    pattern: 'Рисунок:',
    weight: 'Вес:',
    catalog: 'Каталог:',
    clothLeft: 'Осталось ткани: 22 м',
  },
};
