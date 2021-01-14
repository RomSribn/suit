interface GarmentChoiceFormProps {
    lang?: Lang;
    garments?: Garments;
    activeGarments?: string[];
    currentActiveGarment?: string;
    fetchGarments?(): void;
    toggleGarment?: (g: string) => (action: string) => void;
    setCurrentActiveGarment?: (g: string) => void;
    path?: string;
    makeOrder?(garments: string[]): void;
    pushOrderPathitem?(item: OrderPathItem): void;
    isNavigationGarments: boolean;
    setVisibleGarments?: (activeGarments: string[]) => void;
    visibleGarments?: IVisibleGarments;
}
