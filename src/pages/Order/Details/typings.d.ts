interface DetailsProps {
    activeGarments?: SubgroupChoiceItem[];
    lang?: string;
    // setActiveGarment(g: string): void;
}

interface DetailsContainerProps extends DetailsProps {
    garments: Garments;
    activeGarmentsStore: string[];
    order: Order;
}