interface GarmentChoiceFormProps {
    catalogFormClassName?: string;
    lang?: Lang;
    isIndexPage?: boolean;
    garments?: Garments;
    activeGarments?: string[];
    fetchGarments?(): void;
    toggleGarment?: (g: string) => (action: string) => void;
    path?: string;
    makeOrder?(garments: string[]): void;
    pushOrderPathitem?(item: OrderPathItem): void;
    routes: OrderRoutes;
}
