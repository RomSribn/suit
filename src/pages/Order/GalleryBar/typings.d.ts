interface GalleryBarProps {
  items: GalleryStoreItems;
  app?: IAppStore;
  setActiveElementIndex(i: number, action?: string): () => void;
  setPreviewElementIndex(elementIndex: number, action?: 'enter'): void;
  shownItem: GalleryStoreItem;
  isMouseOverElement: boolean;
  activeElementIndex: number;
  filterStore?: IFilterStore;
  activeGarments?: string[];
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
