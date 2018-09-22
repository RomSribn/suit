type RoutesNames = 'index' | 'details' | 'garment' | 'groupChoice' | 'subgroupChoice';

type OrderRoutes = Record<RoutesNames, string>
interface OrderSectionInterface {
    routes: OrderRoutes;
}

interface Subgroup {
    id: string;
    subsection_our_code: string;
    is_subclear?: boolean | null,
    is_multiple: boolean;
    is_input: boolean;
    is_allowOwnFabric: boolean;
    title: {
        en: string;
        ru: string;
    };
}

interface SubgroupsI {
    design: Subgroup[];
    fabric_ref: Subgroup[];
    fitting: Subgroup[];
}

interface SubgroupChoiceItem {
    isSubclear?: boolean | null;
    isInput?: boolean;
    link: string;
    status?: string;
    linkName: string;
    id: string;
}
