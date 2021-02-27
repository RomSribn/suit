type TitleData = {
  title: {
    ru: string;
    en?: string;
  };
};

type ItemLoc = {
  ru?: string;
  en?: string;
};

type RenderValue = {
  title: string;
  itemTitle: string;
};

interface ItemData {
  img_url_2d_list?: string;
  elementCode?: string;
  catalog?: {
    id: number;
    catalogName: string;
  };
  manufacturer?: {
    id: number;
    manufacturerName: string;
  };
  pattern?: TitleData;
  main_color?: TitleData;
  price?: TitleData;
  elementInfo?: { garment: string; group: string; subGroup: string };
  description?: ItemLoc;
  weight?: TitleData;
  title?: {
    ru: string;
  };
}

interface SwiperPopupProps {
  item?: ItemData;
  currentActiveGarment?: string;
  closeButton: () => void;
  lang: string;
}
