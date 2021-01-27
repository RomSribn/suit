interface Loc {
  header: {
    yourStylist: string;
    waitForIt: string;
  };
}

type Localization = Translations<Loc>;

const translations: Localization = {
  en: {
    header: {
      yourStylist: 'Your stylist is Georgiy',
      waitForIt: "Wait for a few seconds please. He's gonna join soon",
    },
  },
  ru: {
    header: {
      yourStylist: 'Ваш стилист Георгий',
      waitForIt: 'Пару секунд и он подключится',
    },
  },
};

export { translations };
