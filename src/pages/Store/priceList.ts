export const priceList: priceListItem[] = [
  {
    id: 1,
    video: `https://www.youtube.com/watch?v=nlDAPQT5d0A`,
    isFileInput: false,
    ru: {
      title: `добавить свой каталог тканей`,
      description: `Укажите, каталог какого производителя добавляете, Выберите для чего предназначена ткань: пиджака, брюк или 
        сорочки. Мы запросим образцы тканей у производителя или фабрики, выгрузим в данную форму заказа.`,
      priceBlock: {
        leftInfo: `1 картинка -`,
        price: 400,
        currency: `₽`,
      },
      inputs: [
        'название производителя ткани или фабрики:',
        'укажите названия каталогов через запятую: каталог 1, каталог 2, ...',
        'комментарий: ваш комментарий или вопрос',
      ],
    },
    en: {
      title: `add your fabric catalog`,
      description: `Write the name of a manufacturer or factory which catalog you are adding. List the 
                catalog names separated by commas. We will request samples of fabrics from the 
                manufacturer or factory. We will upload them to this order form.`,
      priceBlock: {
        leftInfo: `1 fabric -`,
        price: 5,
        currency: `$`,
      },
      inputs: [
        'Name of a manufacturer or factory:',
        'List the catalog names by commas: catalog 1, catalog 2, ...',
        'Comment: your comment or a question',
      ],
    },
  },
  {
    id: 2,
    video: `https://youtu.be/tG2GJZcBKOE`,
    isFileInput: false,
    ru: {
      title: `заказать картинки готовых изделий`,
      description: `Укажите, для какого производителя и каталога заказываете картинки пиджака, брюк, сорочки. Мы запросим образцы
            тканей у производителя или фабрики, подготовим картинки с помощью 3D визуализации. Обходимся без фотосессий
            и пошива изделий. Стоимость указана за одну картинку.`,
      priceBlock: {
        leftInfo: `1 картинка -`,
        price: 700,
        currency: `₽`,
      },
      inputs: [
        'название производителя ткани или фабрики:',
        'укажите названия каталогов через запятую: каталог 1, каталог 2, ...',
        'комментарий: ваш комментарий или вопрос',
      ],
    },
    en: {
      title: `order pictures of finished garments`,
      description: `Write the name of a manufacturer or factory which catalog you are adding. List the 
                catalog names separated by commas. We will request samples of fabrics from the 
                manufacturer or factory and prepare pictures using 3D render. We’ll prepear these 
                images without photo shoots and tailoring.`,
      priceBlock: {
        leftInfo: `1 image -`,
        price: 9,
        currency: `$`,
      },
      inputs: [
        'Name of a manufacturer or factory:',
        'List the catalog names by commas: catalog 1, catalog 2, ...',
        'Comment: your comment or a question',
      ],
    },
  },
  {
    id: 3,
    video: `https://www.youtube.com/watch?v=E4NBGXtky0E`,
    isFileInput: true,
    ru: {
      title: `добавить свой логотип`,
      description: `Сейчас в данной форме заказа наш логотип. Вы можете заменить его на свой. Загрузите для этого логотип в jpeg,
            png или векторном формате. Это позволит не знакомить ваших клиентов с другим брендом.`,
      priceBlock: {
        leftInfo: `1 месяц -`,
        price: 1600,
        currency: `₽`,
      },
      inputs: ['загрузите свой логотип'],
    },
    en: {
      title: `add your logo`,
      description: `There is our logo in this order form now. You can replace it with your own. Download your 
                logo in vector format.`,
      priceBlock: {
        leftInfo: `1 month -`,
        price: 20,
        currency: `$`,
      },
      inputs: ['upload your logo'],
    },
  },
  {
    id: 4,
    video: `https://www.youtube.com/watch?v=MruNugpHDV0`,
    isFileInput: true,
    ru: {
      title: `добавить свой 2D каталог`,
      description: `Выгрузите свой каталог доступных опций и мерки для сорочки, пиджака и брюк. Наш художник подготовит картинки
            и выгрузит их в данную форму заказа.Это позволит оформить заказ в системе, создать аккаунт клиента для 
            повторных удаленных заказов. Скачать pdf заказа для клиента.`,
      priceBlock: {
        leftInfo: `от -`,
        price: 181300,
        currency: `₽`,
      },
      inputs: ['загрузите свои каталоги', 'загрузите доступные мерки'],
    },
    en: {
      title: `add 2D catalogs of your garments`,
      description: `Upload your catalogs of available options and measurements for shirt, jacket and 
                trousers. Our artist will prepare pictures and upload them to this order form. This will 
                allow you to place an order in the system, create a customer account for repeated 
                remote orders. Download example of pdf order for client.`,
      priceBlock: {
        leftInfo: `from -`,
        price: 2400,
        currency: `$`,
      },
      inputs: ['upload your catalogs', 'upload your measurements'],
    },
  },
  {
    id: 5,
    video: `https://www.youtube.com/watch?v=3kbdGHavGKg`,
    isFileInput: true,
    ru: {
      title: `добавить свой 3D каталог`,
      description: `Выгрузите каталог доступных опций и мерки для сорочки, пиджака и брюк. Наш художник подготовит картинки, 3D 
            модели и выгрузит их в данную форму заказа.Это позволит вам показать на манекене каждую опцию и оформить 
            заказ в системе, создать аккаунт клиента для повторных удаленных заказов. Скачать pdf файл заказа для клиента.`,
      priceBlock: {
        leftInfo: `от -`,
        price: 513500,
        currency: `₽`,
      },
      inputs: ['загрузите свои каталоги', 'загрузите доступные мерки'],
    },
    en: {
      title: `add 3D catalogs of your garments`,
      description: `Upload your catalogs of available options and measurements for shirt, jacket and trousers. 
                Our artist will prepare pictures and upload them to this order form. This will allow you to 
                show each option on the mannequin and place an order in the system. Create a customer 
                account for repeated remote orders. Download example of pdf order for client.`,
      priceBlock: {
        leftInfo: `from -`,
        price: 6800,
        currency: `$`,
      },
      inputs: ['upload your catalogs', 'upload your measurements'],
    },
  },
];
