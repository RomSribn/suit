interface FooterBarProps {
    lang?: string;
    orderStore?: Order;
    popOrderPathitem?(): void;
    backLink?: string;
    hasOrder?: boolean;
}