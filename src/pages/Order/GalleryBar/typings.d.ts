interface GalleryBarProps {
    items: GalleryStoreItems,
    app?: IAppStore,
    setActiveElementIndex(i: number, action?: string): () => void;
    setPreviewElementIndex(elementIndex: number, action?: string): void;
    shownItem: GalleryStoreItem;
    isMouseOverElement: boolean;
    activeElementIndex: number;
}

interface Child {
    offsetHeight: number;
    offsetWidth: number;
}

interface ScrollEventTarget extends EventTarget {
    offsetHeight: number;
    querySelector: (identifier: string) => Child;
}

interface ScrollEvent extends React.UIEvent<HTMLDivElement> {
    target: ScrollEventTarget;
}
