interface OrderRoutes {
    index: string;
    details: string;
}

interface OrderSectionInterface {
    routes: OrderRoutes;
}

interface HeaderBarProps {
    userName?: string;
    showChopcard?: boolean;
}

interface HeaderProps extends HeaderBarProps {
    path?: string;
}

interface HeaderContainerProps extends HeaderProps {
    location?: Location;    
}

interface Subgroup {
    id: string;
    subsection_our_code: string;
    is_subclear?: boolean | null,
    title: {
        en: string;
        ru: string;
    };
    image: string;
    image_url_2d: string[];
    image_url_3d: string[];
    price_category: string;
    radio_group: string;
    searchable: boolean;
    description_en: string;
    description_ru: string;
    exampleUrl: string;
    sections: string; // [],
    image_dir: string;
}

interface SubgroupsI {
    design: Subgroup[];
    fabric_ref: Subgroup[];
    fitting: Subgroup[];
}

interface SubgroupChoiceItem {
    isSubclear?: boolean | null;
    link: string;
    status?: string;
    linkName: string;
    id: string;
}
