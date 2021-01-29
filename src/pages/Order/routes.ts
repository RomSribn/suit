type MakeRoutes = (indexRoute?: string) => OrderRoutes;

const makeRoutes: MakeRoutes = (indexRoute = '/order') => {
  return {
    index: '/order',
    details: `${indexRoute}/details`,
    garment: `${indexRoute}/details/:garment`,
    groupChoice: `${indexRoute}/details/:garment/:group`,
    subgroupChoice: `${indexRoute}/details/:garment/:group/:subgroup`,
    fabric: `${indexRoute}/details/:garment/fabric_ref/fabric`,
    design: `${indexRoute}/details/:garment/design`,
    fitting: `${indexRoute}/details/:garment/fitting`,
  };
};
const routes = makeRoutes();

const translations = {
  baseRoute: {
    en: {
      shirt: 'shirt',
    },
    ru: {
      shirt: 'рубашка',
    },
  },
  garment: {
    en: {
      shirt: 'shirt',
    },
    ru: {
      shirt: 'рубашка',
    },
  },
  group: {
    en: {
      fabric_ref: 'fabric',
      design: 'design',
      fitting: 'fitting',
    },
    ru: {
      fabric_ref: 'фабрика',
      design: 'дизайн',
      fitting: 'мерки',
    },
  },
  subgroup: {
    en: {
      fabric: 'fabric',
      collar: 'collar',
      front: 'front',
      yoke: 'yoke',
      back: 'back',
      sleeves: 'sleeves',
      cuffs: 'cuffs',
      pocket: 'pocket',
      buttons: 'buttons',
      buttonholes_color: 'buttonholes_color',
      hem: 'hem',
      initials_arrangement: 'initials arrangement',
      initials_style: 'initials style',
      initials_color: 'initials_color',
      fitting: 'fitting',
    },
    ru: {
      fabric: 'материал',
      collar: 'воротник',
      front: 'перед',
      yoke: 'кокетка',
      back: 'спина',
      sleeves: 'рукава',
      cuffs: 'манжеты',
      pocket: 'карман',
      buttons: 'buttons',
      buttonholes_color: 'цвет петли',
      hem: 'подол',
      initials_arrangement: 'расположение инициалов',
      initials_style: 'стиль инициалов',
      initials_color: 'цвет инициалов',
      fitting: 'мерки',
    },
  },
};

type RootKey =
  | 'index'
  | 'details'
  | 'garment'
  | 'groupChoice'
  | 'subgroupChoice';

const getCombinedPathAndTitle = (routeKey: RootKey) => ({
  path: routes[routeKey],
  routeKey,
  title:
    routes[routeKey].indexOf(':') !== -1
      ? (
        <string>
        routes[routeKey]
      )
        .split('/')
        .filter((item: string) => item.indexOf(':') !== -1)
        .reduce((acc, cur) => {
          const curClear = cur.replace(':', '');
          acc[curClear] = translations[curClear];
          return acc;
        }, {})
      : Object.keys(translations.baseRoute).reduce((acc, cur) => {
        acc[cur] = translations.baseRoute[cur][routeKey];
        return acc;
      }, {}),
});

export { makeRoutes, routes, getCombinedPathAndTitle };
