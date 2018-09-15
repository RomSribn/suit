interface HeaderBarProps {
    userStore: IUserStore;
    lang: string;
    setLang: (lang: string) => void;
}

interface HeaderProps {
    appStore: IAppStore;
    userStore: IUserStore;
    lang: string;
    path?: string;
}

interface HeaderContainerProps extends Partial<HeaderProps> {
    userStore?: IUserStore;
    appStore?: IAppStore;
    location?: Location;    
}
