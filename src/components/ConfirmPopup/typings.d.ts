interface ConfirmPopUpState {
    isOpen: boolean,
}

interface DefaultProps {
    lang: Lang;
    actionText: string;
    onAcceptClick: (...args: any[]) => any;
}

type ConfirmPopupProps = {
    children?: React.ReactNode;
} & Partial<DefaultProps>;
