interface DetailsProps {
  activeGarments?: SubgroupChoiceItem[];
  lang?: Lang;
}

interface DetailsContainerProps extends DetailsProps {
  garments: Garments;
  activeGarmentsStore: string[];
  order: Order;
}
