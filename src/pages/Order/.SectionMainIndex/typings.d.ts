interface MainProps {
    lang?: string;
    changeLanguage?: (l: string) => void;
    garments?: Garments;
    fetchGarments?: () => void;
}