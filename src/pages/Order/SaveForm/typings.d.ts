interface CommonProps {
  close?: (...args: any[]) => any;
}

interface InjectedStores {
  lang: Lang;
  orderStore: IOrderStore;
}

type ContainerProps = Partial<InjectedStores> & CommonProps;

type FormProps = InjectedStores & CommonProps;

interface Loc {
  header: string;
  infoText: string;
  placeHolders: {
    name: string;
    phone: string;
    email: string;
  };
  backText: string;
  sendOrder: string;
  thanksHeader?: string;
  thanksText: string;
  licenseAgreement: string;
  personalData: string;
  required?: string;
  phoneRequirements?: string;
}

type Localization = Translations<Loc>;

type Field = {
  name: string;
  required?: boolean;
  component?: 'input';
  type: string;
  render?: (props: any) => React.ReactNode;
  parse?: (value: any, name: string) => any;
  validate?: (lang: string) => (value: string) => any;
};
