interface IGarmentChoiceFormProps {
  activeGarments?: string[];
  currentActiveGarment?: string;
  setHiddenGarments?: (activeGarments: string[]) => void;
  hiddenGarments?: IHiddenGarments;
  setOrderDummyParams?: (activeGarments: string[]) => void;
}
