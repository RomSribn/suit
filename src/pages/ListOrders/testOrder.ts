type allowedGarment = 'shirt';
type allowedStatuses = 'TEMPORARY' | 'NEW' | 'IN_PROGRESS' | 'DONE';
type CommonOptions = {
  is_allowOwnFabric: boolean;
  is_input: boolean;
  is_multiple: boolean;
  is_subclear: boolean;
  position: number;
  subsection_our_code: string;
  title: MakeLocale<string>;
};
type SubgroupValues = {
  common: CommonOptions;
  deliveryDays: number;
  dependent_subsection_our_codes: string[];
  description: MakeLocale<string>;
  exception: string[];
  img_url_2d: string;
  main_color: {
    title: MakeLocale<string>;
    value: string;
  };
  our_code: string;
  pattern: {
    title: MakeLocale<string>;
    value: string;
  };
  pattern_size: {
    title: MakeLocale<string>;
    value: string;
  };
  price: {
    title: MakeLocale<string>;
    value: string;
  };
  second_colors: {
    title: MakeLocale<string>;
    value: string;
  }[];
  title: MakeLocale<string>;
  weight: MakeLocale<number>;
};
type ServerGarmentItem = {
  additionalFabric?: SubgroupValues;
  design: SubgroupValues;
  value: string;
};
interface OrderItem {
  customer?: User;
  date: string;
  deliveryDays: number;
  garments: {
    [key in allowedGarment]: {
      fittingVersion: number;
      fittings: [
        {
          value: string;
          fitting: {
            is: number;
            is_input: boolean;
            is_multiple: boolean;
            is_radio_field: boolean;
            our_code: string;
            price: MakeLocale<number>;
            title: MakeLocale<string>;
            fitting_elements: string[];
            common: CommonOptions;
          };
        },
      ];
      items: ServerGarmentItem[];
      mainFabric: SubgroupValues;
    };
  };
  orderId: number;
  price: MakeLocale<number>;
  status: {
    statusId: number;
    name: allowedStatuses;
  };
}

// tslint:disable-next-line
export const testOrder1: OrderItem | any = {
  orderId: 24588,
  customer: {
    id: 24587,
    name: 'test',
    phone: '+78888888888',
    email: 'test@test.com',
    isConfirmed: true,
  },
  status: {
    statusId: 3,
    name: 'IN_PROGRESS',
  },
  price: {
    ru: 5900,
    en: 85,
  },
  deliveryDays: 14,
  date: '2020-12-03T14:18:08.569862Z',
  garments: {
    shirt: {
      mainFabric: {
        common: {
          is_allowOwnFabric: true,
          is_input: true,
          is_multiple: true,
          is_subclear: true,
          position: 1,
          subsection_our_code: 'string',
          title: {
            en: 'test',
            ru: 'test',
          },
        },
        deliveryDays: 1,
        dependent_subsection_our_codes: [''],
        description: {
          en: 'test',
          ru: 'test',
        },
        exception: [''],
        img_url_2d: 'string',
        main_color: {
          title: {
            en: 'test',
            ru: 'test',
          },
          value: 'string',
        },
        our_code: 'string',
        pattern: {
          title: {
            en: 'test',
            ru: 'test',
          },
          value: 'string',
        },
        pattern_size: {
          title: {
            en: 'test',
            ru: 'test',
          },
          value: 'string',
        },
        price: {
          title: {
            en: 'test',
            ru: 'test',
          },
          value: 'string',
        },
        second_colors: [
          {
            title: {
              en: 'test',
              ru: 'test',
            },
            value: 'string',
          },
        ],
        title: {
          en: 'test',
          ru: 'test',
        },
        weight: {
          en: 1,
          ru: 1,
        },
      },
      price: {
        title: {
          ru: '5900.00',
          en: '85.00',
        },
        value: '5900.00',
      },
      delivery_days: 14,
      is_item_clear: false,
      common: {
        title: {
          ru: 'ткань',
          en: 'fabric',
        },
        subsection_our_code: 'fabric',
        is_multiple: false,
        is_input: false,
        is_subclear: false,
        is_allowOwnFabric: false,
        position: 1,
      },
    },
    items: [
      {
        design: {
          our_code: 'cpk1',
          title: {
            ru: 'стандартный',
            en: 'standart',
          },
          elementCode: '24',
          description: {
            ru: 'Стандартный нагрудный карман.',
            en: 'Standart chest pocket.',
          },
          exception: [],
          dependent_subsection_our_codes: [],
          geo_url_3d: 'test',
          tex_url_3d: 'test',
          img_url_2d: '/html/assets/2d/4/cpk1/cpk1.svg',
          img_url_2d_list: ['/html/assets/2d/4/cpk1/cpk1.svg'],
          img_url_2d_thumbnail_list: [''],
          main_color: {
            title: {
              ru: '',
              en: 'test',
            },
            value: '',
          },
          second_colors: [],
          pattern: {
            title: {
              ru: '',
              en: 'test',
            },
            value: '',
          },
          pattern_size: {
            title: {
              ru: '',
              en: 'test',
            },
            value: '',
          },
          weight: {
            title: {
              ru: '0',
              en: '0',
            },
            value: '0',
          },
          price: {
            title: {
              ru: '0.00',
              en: '0.00',
            },
            value: '0.00',
          },
          delivery_days: 0,
          is_item_clear: true,
          common: {
            title: {
              ru: 'нагрудный карман',
              en: 'chest pocket',
            },
            subsection_our_code: 'chest_pocket',
            is_multiple: false,
            is_input: false,
            is_subclear: false,
            is_allowOwnFabric: false,
            position: 6,
          },
        },
        additionalFabric: 'test',
        value: 'test',
      },
      {
        design: {
          our_code: 'mdl2',
          title: {
            ru: 'однобортный, 2 пуговицы',
            en: 'single-breasted, 2 buttons',
          },
          elementCode: '2',
          description: {
            ru: 'Однобортный, 2 пуговицы, прямоугольный лацкан.',
            en: 'Single-breasted,two buttons, notch lapel.',
          },
          exception: [],
          dependent_subsection_our_codes: [],
          geo_url_3d: 'test',
          tex_url_3d: 'test',
          img_url_2d: '/html/assets/2d/4/mdl2/mdl2.svg',
          img_url_2d_list: ['/html/assets/2d/4/mdl2/mdl2.svg'],
          img_url_2d_thumbnail_list: [''],
          main_color: {
            title: {
              ru: '',
              en: 'test',
            },
            value: '',
          },
          second_colors: [],
          pattern: {
            title: {
              ru: '',
              en: 'test',
            },
            value: '',
          },
          pattern_size: {
            title: {
              ru: '',
              en: 'test',
            },
            value: '',
          },
          weight: {
            title: {
              ru: '0',
              en: '0',
            },
            value: '0',
          },
          price: {
            title: {
              ru: '0.00',
              en: '0.00',
            },
            value: '0.00',
          },
          delivery_days: 0,
          is_item_clear: true,
          common: {
            title: {
              ru: 'модель',
              en: 'model',
            },
            subsection_our_code: 'model',
            is_multiple: false,
            is_input: false,
            is_subclear: false,
            is_allowOwnFabric: false,
            position: 2,
          },
        },
        additionalFabric: 'test',
        value: 'test',
      },
      {
        design: {
          our_code: 'sle2',
          title: {
            ru: 'стандартный без пуговиц',
            en: 'standart without buttons',
          },
          elementCode: '23',
          description: {
            ru: 'Стандартный рукав без пуговиц.',
            en: 'Standart sleeve without buttons.',
          },
          exception: [],
          dependent_subsection_our_codes: [],
          geo_url_3d: 'test',
          tex_url_3d: 'test',
          img_url_2d: '/html/assets/2d/4/sle2/sle2.svg',
          img_url_2d_list: ['/html/assets/2d/4/sle2/sle2.svg'],
          img_url_2d_thumbnail_list: [''],
          main_color: {
            title: {
              ru: '',
              en: 'test',
            },
            value: '',
          },
          second_colors: [],
          pattern: {
            title: {
              ru: '',
              en: 'test',
            },
            value: '',
          },
          pattern_size: {
            title: {
              ru: '',
              en: 'test',
            },
            value: '',
          },
          weight: {
            title: {
              ru: '0',
              en: '0',
            },
            value: '0',
          },
          price: {
            title: {
              ru: '0.00',
              en: '0.00',
            },
            value: '0.00',
          },
          delivery_days: 0,
          is_item_clear: true,
          common: {
            title: {
              ru: 'рукава',
              en: 'sleeves',
            },
            subsection_our_code: 'sleeves',
            is_multiple: false,
            is_input: false,
            is_subclear: false,
            is_allowOwnFabric: false,
            position: 4,
          },
        },
        additionalFabric: 'test',
        value: 'test',
      },
      {
        design: {
          our_code: 'pks1',
          title: {
            ru: 'клапан',
            en: 'flap',
          },
          elementCode: '25',
          description: {
            ru: 'Стандартный клапан.',
            en: 'Standart flap.',
          },
          exception: [],
          dependent_subsection_our_codes: [],
          geo_url_3d: 'test',
          tex_url_3d: 'test',
          img_url_2d: '/html/assets/2d/4/pks1/pks1.svg',
          img_url_2d_list: ['/html/assets/2d/4/pks1/pks1.svg'],
          img_url_2d_thumbnail_list: [''],
          main_color: {
            title: {
              ru: '',
              en: 'test',
            },
            value: '',
          },
          second_colors: [],
          pattern: {
            title: {
              ru: '',
              en: 'test',
            },
            value: '',
          },
          pattern_size: {
            title: {
              ru: '',
              en: 'test',
            },
            value: '',
          },
          price: {
            title: {
              ru: '0.00',
              en: '0.00',
            },
            value: '0.00',
          },
          delivery_days: 0,
          is_item_clear: true,
          common: {
            title: {
              ru: 'карманы',
              en: 'pockets',
            },
            subsection_our_code: 'pockets',
            is_multiple: false,
            is_input: false,
            is_subclear: false,
            is_allowOwnFabric: false,
            position: 5,
          },
        },
        additionalFabric: undefined,
        value: 'test',
      },
      {
        design: {
          our_code: 'bak3',
          title: {
            ru: 'шлицы с 2 сторон',
            en: 'vents 2 sides',
          },
          elementCode: '22',
          description: {
            ru: 'Шлицы с двух сторон.',
            en: 'Two sides vents.',
          },
          exception: [],
          dependent_subsection_our_codes: [],
          geo_url_3d: 'test',
          tex_url_3d: 'test',
          img_url_2d: '/html/assets/2d/4/bak3/bak3.svg',
          img_url_2d_list: ['/html/assets/2d/4/bak3/bak3.svg'],
          img_url_2d_thumbnail_list: [''],
          main_color: {
            title: {
              ru: '',
              en: 'test',
            },
            value: '',
          },
          second_colors: [],
          pattern: {
            title: {
              ru: '',
              en: 'test',
            },
            value: '',
          },
          pattern_size: {
            title: {
              ru: '',
              en: 'test',
            },
            value: '',
          },
          weight: {
            title: {
              ru: '0',
              en: '0',
            },
            value: '0',
          },
          price: {
            title: {
              ru: '0.00',
              en: '0.00',
            },
            value: '0.00',
          },
          delivery_days: 0,
          is_item_clear: true,
          common: {
            title: {
              ru: 'спина',
              en: 'back',
            },
            subsection_our_code: 'back',
            is_multiple: false,
            is_input: false,
            is_subclear: false,
            is_allowOwnFabric: false,
            position: 3,
          },
        },
        additionalFabric: 'test',
        value: 'test',
      },
      {
        design: {
          our_code: 'buo1',
          title: {
            ru: 'черная',
            en: 'black',
          },
          elementCode: '32',
          description: {
            ru: 'Черная стандартная пуговица.',
            en: 'Black standart buttons.',
          },
          exception: [],
          dependent_subsection_our_codes: [],
          geo_url_3d: 'test',
          tex_url_3d: 'test',
          img_url_2d: 'test',
          img_url_2d_list: [''],
          img_url_2d_thumbnail_list: [''],
          main_color: {
            title: {
              ru: '',
              en: 'test',
            },
            value: '',
          },
          second_colors: [],
          pattern: {
            title: {
              ru: '',
              en: 'test',
            },
            value: '',
          },
          pattern_size: {
            title: {
              ru: '',
              en: 'test',
            },
            value: '',
          },
          weight: {
            title: {
              ru: '0',
              en: '0',
            },
            value: '0',
          },
          price: {
            title: {
              ru: '0.00',
              en: '0.00',
            },
            value: '0.00',
          },
          delivery_days: 0,
          is_item_clear: true,
          common: {
            title: {
              ru: 'пуговицы',
              en: 'buttons',
            },
            subsection_our_code: 'buttons',
            is_multiple: false,
            is_input: false,
            is_subclear: false,
            is_allowOwnFabric: false,
            position: 7,
          },
        },
        additionalFabric: 'test',
        value: 'test',
      },
    ],
    fittings: [],
    fittingVersion: 1,
  },
};
// tslint:disable-next-line
export const testOrder2: OrderItem | any = {
  orderId: 24589,
  customer: {
    id: 24587,
    name: 'test',
    phone: '+78888888888',
    email: 'test@test.com',
    isConfirmed: true,
  },
  status: {
    statusId: 2,
    name: 'DONE',
  },
  price: {
    ru: 5900,
    en: 85,
  },
  deliveryDays: 14,
  date: '2020-12-03T14:18:08.569862Z',
  garments: {
    shirt: {
      mainFabric: {
        common: {
          is_allowOwnFabric: true,
          is_input: true,
          is_multiple: true,
          is_subclear: true,
          position: 1,
          subsection_our_code: 'string',
          title: {
            en: 'test',
            ru: 'test',
          },
        },
        deliveryDays: 1,
        dependent_subsection_our_codes: [''],
        description: {
          en: 'test',
          ru: 'test',
        },
        exception: [''],
        img_url_2d: 'string',
        main_color: {
          title: {
            en: 'test',
            ru: 'test',
          },
          value: 'string',
        },
        our_code: 'string',
        pattern: {
          title: {
            en: 'test',
            ru: 'test',
          },
          value: 'string',
        },
        pattern_size: {
          title: {
            en: 'test',
            ru: 'test',
          },
          value: 'string',
        },
        price: {
          title: {
            en: 'test',
            ru: 'test',
          },
          value: 'string',
        },
        second_colors: [
          {
            title: {
              en: 'test',
              ru: 'test',
            },
            value: 'string',
          },
        ],
        title: {
          en: 'test',
          ru: 'test',
        },
        weight: {
          en: 1,
          ru: 1,
        },
      },
      price: {
        title: {
          ru: '5900.00',
          en: '85.00',
        },
        value: '5900.00',
      },
      delivery_days: 14,
      is_item_clear: false,
      common: {
        title: {
          ru: 'ткань',
          en: 'fabric',
        },
        subsection_our_code: 'fabric',
        is_multiple: false,
        is_input: false,
        is_subclear: false,
        is_allowOwnFabric: false,
        position: 1,
      },
    },
    items: [
      {
        design: {
          our_code: 'cpk1',
          title: {
            ru: 'стандартный',
            en: 'standart',
          },
          elementCode: '24',
          description: {
            ru: 'Стандартный нагрудный карман.',
            en: 'Standart chest pocket.',
          },
          exception: [],
          dependent_subsection_our_codes: [],
          geo_url_3d: 'test',
          tex_url_3d: 'test',
          img_url_2d: '/html/assets/2d/4/cpk1/cpk1.svg',
          img_url_2d_list: ['/html/assets/2d/4/cpk1/cpk1.svg'],
          img_url_2d_thumbnail_list: [''],
          main_color: {
            title: {
              ru: '',
              en: 'test',
            },
            value: '',
          },
          second_colors: [],
          pattern: {
            title: {
              ru: '',
              en: 'test',
            },
            value: '',
          },
          pattern_size: {
            title: {
              ru: '',
              en: 'test',
            },
            value: '',
          },
          weight: {
            title: {
              ru: '0',
              en: '0',
            },
            value: '0',
          },
          price: {
            title: {
              ru: '0.00',
              en: '0.00',
            },
            value: '0.00',
          },
          delivery_days: 0,
          is_item_clear: true,
          common: {
            title: {
              ru: 'нагрудный карман',
              en: 'chest pocket',
            },
            subsection_our_code: 'chest_pocket',
            is_multiple: false,
            is_input: false,
            is_subclear: false,
            is_allowOwnFabric: false,
            position: 6,
          },
        },
        additionalFabric: 'test',
        value: 'test',
      },
      {
        design: {
          our_code: 'mdl2',
          title: {
            ru: 'однобортный, 2 пуговицы',
            en: 'single-breasted, 2 buttons',
          },
          elementCode: '2',
          description: {
            ru: 'Однобортный, 2 пуговицы, прямоугольный лацкан.',
            en: 'Single-breasted,two buttons, notch lapel.',
          },
          exception: [],
          dependent_subsection_our_codes: [],
          geo_url_3d: 'test',
          tex_url_3d: 'test',
          img_url_2d: '/html/assets/2d/4/mdl2/mdl2.svg',
          img_url_2d_list: ['/html/assets/2d/4/mdl2/mdl2.svg'],
          img_url_2d_thumbnail_list: [''],
          main_color: {
            title: {
              ru: '',
              en: 'test',
            },
            value: '',
          },
          second_colors: [],
          pattern: {
            title: {
              ru: '',
              en: 'test',
            },
            value: '',
          },
          pattern_size: {
            title: {
              ru: '',
              en: 'test',
            },
            value: '',
          },
          weight: {
            title: {
              ru: '0',
              en: '0',
            },
            value: '0',
          },
          price: {
            title: {
              ru: '0.00',
              en: '0.00',
            },
            value: '0.00',
          },
          delivery_days: 0,
          is_item_clear: true,
          common: {
            title: {
              ru: 'модель',
              en: 'model',
            },
            subsection_our_code: 'model',
            is_multiple: false,
            is_input: false,
            is_subclear: false,
            is_allowOwnFabric: false,
            position: 2,
          },
        },
        additionalFabric: 'test',
        value: 'test',
      },
      {
        design: {
          our_code: 'sle2',
          title: {
            ru: 'стандартный без пуговиц',
            en: 'standart without buttons',
          },
          elementCode: '23',
          description: {
            ru: 'Стандартный рукав без пуговиц.',
            en: 'Standart sleeve without buttons.',
          },
          exception: [],
          dependent_subsection_our_codes: [],
          geo_url_3d: 'test',
          tex_url_3d: 'test',
          img_url_2d: '/html/assets/2d/4/sle2/sle2.svg',
          img_url_2d_list: ['/html/assets/2d/4/sle2/sle2.svg'],
          img_url_2d_thumbnail_list: [''],
          main_color: {
            title: {
              ru: '',
              en: 'test',
            },
            value: '',
          },
          second_colors: [],
          pattern: {
            title: {
              ru: '',
              en: 'test',
            },
            value: '',
          },
          pattern_size: {
            title: {
              ru: '',
              en: 'test',
            },
            value: '',
          },
          weight: {
            title: {
              ru: '0',
              en: '0',
            },
            value: '0',
          },
          price: {
            title: {
              ru: '0.00',
              en: '0.00',
            },
            value: '0.00',
          },
          delivery_days: 0,
          is_item_clear: true,
          common: {
            title: {
              ru: 'рукава',
              en: 'sleeves',
            },
            subsection_our_code: 'sleeves',
            is_multiple: false,
            is_input: false,
            is_subclear: false,
            is_allowOwnFabric: false,
            position: 4,
          },
        },
        additionalFabric: 'test',
        value: 'test',
      },
      {
        design: {
          our_code: 'pks1',
          title: {
            ru: 'клапан',
            en: 'flap',
          },
          elementCode: '25',
          description: {
            ru: 'Стандартный клапан.',
            en: 'Standart flap.',
          },
          exception: [],
          dependent_subsection_our_codes: [],
          geo_url_3d: 'test',
          tex_url_3d: 'test',
          img_url_2d: '/html/assets/2d/4/pks1/pks1.svg',
          img_url_2d_list: ['/html/assets/2d/4/pks1/pks1.svg'],
          img_url_2d_thumbnail_list: [''],
          main_color: {
            title: {
              ru: '',
              en: 'test',
            },
            value: '',
          },
          second_colors: [],
          pattern: {
            title: {
              ru: '',
              en: 'test',
            },
            value: '',
          },
          pattern_size: {
            title: {
              ru: '',
              en: 'test',
            },
            value: '',
          },
          price: {
            title: {
              ru: '0.00',
              en: '0.00',
            },
            value: '0.00',
          },
          delivery_days: 0,
          is_item_clear: true,
          common: {
            title: {
              ru: 'карманы',
              en: 'pockets',
            },
            subsection_our_code: 'pockets',
            is_multiple: false,
            is_input: false,
            is_subclear: false,
            is_allowOwnFabric: false,
            position: 5,
          },
        },
        additionalFabric: undefined,
        value: 'test',
      },
      {
        design: {
          our_code: 'bak3',
          title: {
            ru: 'шлицы с 2 сторон',
            en: 'vents 2 sides',
          },
          elementCode: '22',
          description: {
            ru: 'Шлицы с двух сторон.',
            en: 'Two sides vents.',
          },
          exception: [],
          dependent_subsection_our_codes: [],
          geo_url_3d: 'test',
          tex_url_3d: 'test',
          img_url_2d: '/html/assets/2d/4/bak3/bak3.svg',
          img_url_2d_list: ['/html/assets/2d/4/bak3/bak3.svg'],
          img_url_2d_thumbnail_list: [''],
          main_color: {
            title: {
              ru: '',
              en: 'test',
            },
            value: '',
          },
          second_colors: [],
          pattern: {
            title: {
              ru: '',
              en: 'test',
            },
            value: '',
          },
          pattern_size: {
            title: {
              ru: '',
              en: 'test',
            },
            value: '',
          },
          weight: {
            title: {
              ru: '0',
              en: '0',
            },
            value: '0',
          },
          price: {
            title: {
              ru: '0.00',
              en: '0.00',
            },
            value: '0.00',
          },
          delivery_days: 0,
          is_item_clear: true,
          common: {
            title: {
              ru: 'спина',
              en: 'back',
            },
            subsection_our_code: 'back',
            is_multiple: false,
            is_input: false,
            is_subclear: false,
            is_allowOwnFabric: false,
            position: 3,
          },
        },
        additionalFabric: 'test',
        value: 'test',
      },
      {
        design: {
          our_code: 'buo1',
          title: {
            ru: 'черная',
            en: 'black',
          },
          elementCode: '32',
          description: {
            ru: 'Черная стандартная пуговица.',
            en: 'Black standart buttons.',
          },
          exception: [],
          dependent_subsection_our_codes: [],
          geo_url_3d: 'test',
          tex_url_3d: 'test',
          img_url_2d: 'test',
          img_url_2d_list: [''],
          img_url_2d_thumbnail_list: [''],
          main_color: {
            title: {
              ru: '',
              en: 'test',
            },
            value: '',
          },
          second_colors: [],
          pattern: {
            title: {
              ru: '',
              en: 'test',
            },
            value: '',
          },
          pattern_size: {
            title: {
              ru: '',
              en: 'test',
            },
            value: '',
          },
          weight: {
            title: {
              ru: '0',
              en: '0',
            },
            value: '0',
          },
          price: {
            title: {
              ru: '0.00',
              en: '0.00',
            },
            value: '0.00',
          },
          delivery_days: 0,
          is_item_clear: true,
          common: {
            title: {
              ru: 'пуговицы',
              en: 'buttons',
            },
            subsection_our_code: 'buttons',
            is_multiple: false,
            is_input: false,
            is_subclear: false,
            is_allowOwnFabric: false,
            position: 7,
          },
        },
        additionalFabric: 'test',
        value: 'test',
      },
    ],
    fittings: [],
    fittingVersion: 1,
  },
};
