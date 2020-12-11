type TitleData = {
  title: {
    ru: string,
    en?: string
  },
}

type ItemLoc ={
  ru?: string,
  en?: string
}

interface ItemData {
  img_url_2d_list?: string,
  elementCode?: string,
  pattern?: TitleData,
  main_color?: TitleData,
  price?: TitleData,
  elementInfo?: { garment: string, group: string, subGroup: string }
  description?: ItemLoc
  title?: {
    ru: string
  }
}

interface SwiperPopupProps {
  item?: ItemData,
  closeButton: () => void
  lang: string
}