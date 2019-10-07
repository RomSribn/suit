interface HeaderBarProps {
    userStore: IUserStore;
    lang: Lang;
    isAuth: boolean;
}

interface HeaderProps {
    appStore: IAppStore;
    userStore: IUserStore;
    lang: Lang;
    path?: string;
    isAuth: boolean;
    openMenu: () => void;
}

interface HeaderContainerProps extends Partial<HeaderProps> {
    userStore?: IUserStore;
    appStore?: IAppStore;
    location?: Location;
}

export {
    HeaderProps,
    HeaderContainerProps,
    HeaderBarProps,
};
