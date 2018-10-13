interface ButtonProps {
<<<<<<< HEAD
    children?: React.ReactElement<any>[]| React.ReactElement<any> | any;
    onClick?: (...args: any[]) => any | null;
=======
    children?: React.ReactNode | React.ReactNode[];
    onClick?: (...args: any[]) => any;
>>>>>>> поправил тип для children в ButtonProps
    className?: string;
    type?: string;
    disabled?: boolean;
    style?: object;
    invertTheme?: boolean;
    theme?: 'black' | 'white';
}