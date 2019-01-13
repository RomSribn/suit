type ChangeLanguage = (lang: string) => (a:any) => void;

interface LanguageControlProps {
    lang?: string;
    changeLanguage?: ChangeLanguage;
    mobileOnly?: boolean;
    theme?: 'white' | 'black';
    shortcut?: boolean;
    className?: string;
}

interface LanguageControlLanguageControlContainerProps extends LanguageControlProps {
}