declare type TCallbackArgs = {
  error: string;
};

interface ILoginState {
  isRemember: boolean;
  showForgot: boolean;
  login: string;
  pass: string;
}

interface ILoginProps {
  closeForm?: () => void;
  userStore?: IUserStore;
  loginCallback?: (arg: TCallbackArgs) => void;
  appStore?: IAppStore;
  shouldRedirect?: boolean;
}
