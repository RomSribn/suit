type TPriceBlock = {
  leftInfo: string;
  price: number;
  currency: string;
};

interface PriceListItemLocale {
  title: string;
  description: string;
  priceBlock: TPriceBlock;
  inputs: string[];
}

interface priceListItem {
  id: number;
  video: string;
  isFileInput: boolean;
  ru: PriceListItemLocale;
  en: PriceListItemLocale;
}

interface PriceListGalleryProps {
  priceList: priceListItem[];
  lang: Lang;
  togglePopUp: () => void;
  selectedStoreId: TSelectedStoreId;
  setSelectedStoreId: TSetSelectedStoreId;
}

interface PriceListItemProps extends PriceListItemLocale {
  id: number;
  togglePopUp: () => void;
  selectedStoreId: TSelectedStoreId;
  setSelectedStoreId: TSetSelectedStoreId;
}

interface PriceListItemDescriptionProps {
  lang: Lang;
  open: boolean;
  togglePopUp: () => void;
  selectedStoreId: TSelectedStoreId;
  setUsersStoreFiles: TSetUsersStoreFiles;
  usersStoreItems: IUsersStoreItems[];
  removeSpecificFileFromItem?: TRemoveSpecificFileFromItem;
  submitUserStoreItems: TSubmitUserStoreItems;
  setTextInputFields: TSetTextInputFields;
}

interface ViewStoreItemProps extends PriceListItemLocale {
  id: TSelectedStoreId;
  video: string;
  isFileInput: boolean;
  droppMsg: string;
  setUsersStoreFiles: TSetUsersStoreFiles;
  usersStoreItems: IUsersStoreItems[];
  removeSpecificFileFromItem?: TRemoveSpecificFileFromItem;
  setTextInputFields: TSetTextInputFields;
}

interface StoreItemTitleProps {
  title: string;
  priceBlock: TPriceBlock;
}

interface StoreProps {
  selectedStoreId: TSelectedStoreId;
  setSelectedStoreId: TSetSelectedStoreId;
  setUsersStoreFiles: TSetUsersStoreFiles;
  usersStoreItems: IUsersStoreItems[];
  removeSpecificFileFromItem?: TRemoveSpecificFileFromItem;
  submitUserStoreItems?: TSubmitUserStoreItems;
  setTextInputFields: TSetTextInputFields;
  lang: Lang;
}
