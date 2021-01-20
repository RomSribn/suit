interface IGarmentChoiceFormProps {
    activeGarments?: string[];
    currentActiveGarment?: string;
    setVisibleGarments?: (activeGarments: string[]) => void;
    visibleGarments?: IVisibleGarments;
}
