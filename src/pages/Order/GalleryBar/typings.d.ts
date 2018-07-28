interface GalleryBarProps {
    items: GalleryStoreItems,
    setActiveElementIndex(i: number, action?: string): () => void;
    activeElementIndex: number;
    mouseEnter(link: string): void;
    mouseLeave(): void;
    isMouseOverElement: boolean;
}