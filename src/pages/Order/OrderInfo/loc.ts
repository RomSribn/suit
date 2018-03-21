interface Locale {
    delivery: string;
    price: string;
    currency: string;
}

const makeLocale: MakeLocale<Locale> = () => ({
    en: {
        delivery: 'delivery',
        price: 'total price',
        currency: '$',    
    },
    ru: {
        delivery: 'доставим до',
        price: 'сумма',
        currency: '₽',            
    },
});

const loc = makeLocale();

export {
    loc,
};