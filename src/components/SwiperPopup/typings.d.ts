type TitleData = {
  title: {
    ru: string
  },
}

interface ItemData {
  img_url_2d_list?: string,
  elementCode?: string,
  pattern?: TitleData,
  main_color?: TitleData,
  price?: TitleData,
  title?: {
    ru: string
  }
}

interface SwiperPopupProps {
  item?: ItemData,
  closeButton: () => void
  lang: string
}