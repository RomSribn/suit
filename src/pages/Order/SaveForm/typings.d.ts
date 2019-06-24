interface CommonProps {
    close?: (...args: any[]) => any;
}

interface InjectedStores {
    lang: string;
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
}

type Localization = Translations<Loc>;

type Field = {
    name: string,
    required?: boolean,
    component: string,
    type: string,
};
