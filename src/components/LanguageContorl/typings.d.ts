type ChangeLanguage = (lang: string) => (a:any) => void;

interface LanguageControlProps {
    lang?: string;
    changeLanguage?: ChangeLanguage;
}

interface LanguageControlLanguageControlPropsProps extends LanguageControlProps {
    location: Location;
    route: string;   
}