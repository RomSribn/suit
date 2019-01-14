import { Crumbs } from 'react-breadcrumbs';
interface HeaderBarProps {
    userStore: IUserStore;
    lang: string;
    isAuth: boolean;
}

interface HeaderProps {
    appStore: IAppStore;
    userStore: IUserStore;
    lang: string;
    path?: string;
    isAuth: boolean;
    openMenu: () => void;
    setCrumbs: (crumbs: Crumbs) => Crumbs;
    title: string;
}

interface HeaderContainerProps extends Partial<HeaderProps> {
    userStore?: IUserStore;
    appStore?: IAppStore;
    location?: Location;
}
