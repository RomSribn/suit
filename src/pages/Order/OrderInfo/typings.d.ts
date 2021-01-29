interface OrderInfoProps {
  lang: Lang;
  deliveryDate: string;
  price: string;
}

interface COrderInfoProps {
  order?: IOrderStore;
  lang?: Lang;
}
