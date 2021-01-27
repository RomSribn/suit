declare type TMobileNavigationMenuPopupProps = {
    currentLang: string,
    closeMenu: () => void,
    setLang: (lang: string) => void,
    toggleLoginForm: () => void,
    sideEffects: [() => void],
    role?: Role,
    activeGarments?: string[],
    currentActiveGarment?: string,
    setCurrentActiveGarment?: (garment: string) => void,
};

declare type SubmenuItem = {
    name: {
        ru: string,
        en: string
    },
    id: string,
};

declare type MenuLink = {
    name: string,
    url: string,
    sideEffect?: string,
    withoutArrow?: boolean,
    withoutBaseUrl?: boolean,
    unusualSideEffect?: () => void,
    submenu?: Array<SubmenuItem>
};