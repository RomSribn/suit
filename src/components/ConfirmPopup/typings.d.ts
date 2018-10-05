interface ConfirmPopUpState {
    isOpen: boolean,
}

interface DefaultProps {
    lang: Lang;
    actionText: string;
}

type ConfirmPopupProps = {
    children?: React.ReactNode;
} & Partial<DefaultProps>;
