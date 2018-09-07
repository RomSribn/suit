interface ButtonProps {
    children?: React.ReactElement<any>[]| React.ReactElement<any>;
    onClick?: (...args: any[]) => any;
    className?: string;
    type?: string;
    theme?: 'black' | 'white'
}