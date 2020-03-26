interface TableCustomerInfo {
    id: string;
    name: string;
    phone: string;
    email: string;
    password: string;
    lastOrderId: string;
}

interface PanelRowCustomersProps {
    lang: Lang;
    activeCustomerId?: string | null;
}
