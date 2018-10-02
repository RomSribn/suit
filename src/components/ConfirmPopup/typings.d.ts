interface OrderStatusIncreaseState {
    isOpen: boolean,
}

interface DefaultProps {
    lang: Lang;
    actionText: string;
}

type OrderStatusIncreaseProps = {
    children?: React.ReactNode;
} & Partial<DefaultProps>;
