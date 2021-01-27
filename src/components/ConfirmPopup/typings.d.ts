declare type TextFields = 'confirm' | 'back' | 'confirmText' | 'defaultActionText';

declare type Locale = Record<TextFields, string>;

type TOnAcceptClick = (...args: any[]) => any;

declare interface ConfirmPopUpState {
    isOpen: boolean,
}

interface DefaultProps {
    lang: Lang;
    actionText: string;
    onAcceptClick: TOnAcceptClick;
}

declare type ConfirmPopupProps = {
    children?: React.ReactNode;
} & Partial<DefaultProps>;
