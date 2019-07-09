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
    thanksText: string;
    licenseAgreement: string;
    personalData: string;
}

type Localization = Translations<Loc>;

type Field = {
    name: string,
    required?: boolean,
    component: 'input',
    type: string,
};
