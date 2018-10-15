interface HeaderBarProps {
    userStore: IUserStore;
    lang: string;
    setLang: (lang: string) => void;
    isAuth: boolean;
}

interface HeaderProps {
    appStore: IAppStore;
    userStore: IUserStore;
    lang: string;
    path?: string;
    isAuth: boolean;
}

interface HeaderContainerProps extends Partial<HeaderProps> {
    userStore?: IUserStore;
    appStore?: IAppStore;
    location?: Location;    
}
