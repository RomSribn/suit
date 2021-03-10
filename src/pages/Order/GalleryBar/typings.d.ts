interface GalleryBarProps {
  items: GalleryStoreItems;
  app?: IAppStore;
  setActiveElementIndex(ourCode: string, action?: string): () => void;
  setPreviewElementIndex(ourCode: string, action?: 'enter'): void;
  shownItem: GalleryStoreItem;
  isMouseOverElement: boolean;
  activeElementCode: string;
  filterStore?: IFilterStore;
  activeGarments?: string[];
  currentActiveGarment?: string;
  setOrderDummyParams?: (params: string[]) => void;
  setFocusableGarment?: (our_code: string) => void;
}

interface Child {
  offsetHeight: number;
  offsetWidth: number;
}

interface ScrollEventTarget extends EventTarget {
  offsetHeight: number;
  scrollTop: number;
  querySelector: (identifier: string) => Child;
}

interface ScrollEvent extends React.UIEvent<HTMLDivElement> {
  target: ScrollEventTarget;
}
