interface Locale {
  order: string;
  shirt: string;
  cloth: string;
  clothSelected: string;
  designSelected: string;
  continue: string;
  currency: string;
  productInfo: string;
  fabricColor: string;
  figure: string;
  density: string;
  composition: string;
  catalog: string;
  category: string;
  design: string;
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
    fabricColor: 'Fabric color:',
    figure: 'Figure:',
    density: 'Density: 120-140',
    composition: 'Composition: cotton',
    catalog: 'Catalog: CLASSIC A-1',
    category: 'Category: 40-50s Classic',
    design: 'Design: 50',
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
    fabricColor: 'Цвет ткани:',
    figure: 'Рисунок:',
    density: 'Плотность: 120-140',
    composition: 'Состав: Хлопок',
    catalog: 'Каталог: CLASSIC A-1',
    category: 'Категория: 40-50s Classic',
    design: 'Конструкция: 50',
    clothLeft: 'Осталось ткани: 22 м',
  },
};
