interface OrderInfoProps {
    lang: string;
    deliveryDate: string;
    price: string;
}

interface COrderInfoProps {
    order?: IOrderStore,
    lang?: string
}