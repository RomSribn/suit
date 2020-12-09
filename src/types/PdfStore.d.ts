type PdfStatus = 'NOT_GENERATED' | 'IN_PROGRESS' | 'GENERATED';

interface IPdfStore {
    pdfStatesByOrderId: Map<string, { isFetching: boolean, error?: Error }>;
    generatePdf: (orderId: string, token: string, role: Role) => void;
    checkStatusPdf: (orderId: string, headers: Axios.RequestConfig) => void;
    getPdf: (orderId: string, headers: Axios.RequestConfig) => void;
}
