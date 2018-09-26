interface GalleryBarProps {
    items: GalleryStoreItems,
    setActiveElementIndex(i: number, action?: string): () => void;
    shownItem: GalleryStoreItem;
    mouseEnter(link: string): void;
    mouseLeave(): void;
    isMouseOverElement: boolean;
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
