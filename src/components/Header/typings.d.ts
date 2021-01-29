declare type TOpenMenu = () => void;

declare interface HeaderBarProps {
  userStore: IUserStore;
  lang: Lang;
  isAuth: boolean;
}

declare interface HeaderProps {
  appStore: IAppStore;
  userStore: IUserStore;
  lang: Lang;
  path?: string;
  isAuth: boolean;
  openMenu: TOpenMenu;
}

declare interface HeaderContainerProps extends Partial<HeaderProps> {
  userStore?: IUserStore;
  appStore?: IAppStore;
  location?: Location;
}
