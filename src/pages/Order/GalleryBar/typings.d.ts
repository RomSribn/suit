interface GalleryBarProps {
    items: GalleryStoreItems,
    setActiveElementIndex(i: number, action?: string): () => void;
}