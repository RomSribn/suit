interface ButtonProps {
    children?: React.ReactElement<any>[]| React.ReactElement<any>;
    onClick?: (...args: any[]) => any;
    className?: string;
    type?: string;
    disabled?: boolean;
    style?: object;
    theme?: 'black' | 'white';
    invertTheme?: boolean;
}