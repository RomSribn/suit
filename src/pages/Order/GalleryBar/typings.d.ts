interface GalleryBarProps {
    items: GalleryStoreItems,
    app?: IAppStore,
    shownItem: GalleryStoreItem;
    isMouseOverElement: boolean;
    activeElementIndex: number;
    galleryFooterRef: React.RefObject<HTMLDivElement>;
    setActiveElementIndex(i: number, action?: string): () => void;
    setPreviewElementIndex(elementIndex: number, action?: 'enter'): void;
    showFooter(): void;
    hideFooter(): void;
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
