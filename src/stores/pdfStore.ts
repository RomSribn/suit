import { observable, action } from 'mobx';
import { callApi } from '../utils/apiAxios';
import { services } from '../config/routes';

class PdfStore implements IPdfStore {
  @observable pdfStatesByOrderId = new Map<
    string,
    { isFetching: boolean; error?: Error }
  >();

  @action
  generatePdf = (orderId: string, token: string, role: Role) => {
    const tokenType = {
      CUSTOMER: 'customer-token',
      STYLIST: 'stylist-token',
    };
    const headers = { [tokenType[role]]: token };
    let host = window.location.host;

    if (host === 'localhost:3000') {
      host = '3d.suit.ru'; // иначе придет пустой пдф
    }

    callApi(
      {
        method: 'POST',
        url: `${services.pdfs}/?orderId=${orderId}&host=${host}`,
        headers,
      },
      () => null,
      () => {
        this.pdfStatesByOrderId.set(orderId, { isFetching: true });
        this.checkStatusPdf(orderId, headers);
      },
      (error: Error) => {
        this.pdfStatesByOrderId.set(orderId, { isFetching: false, error });
      },
    );
  };

  @action
  checkStatusPdf = (orderId: string, headers: Axios.RequestConfig) => {
    callApi(
      {
        method: 'GET',
        url: `${services.pdfs}/${orderId}/status`,
        headers,
      },
      () => null,
      (status: PdfStatus) => {
        if (status === 'GENERATED') {
          this.getPdf(orderId, headers);
          return;
        }
        setTimeout(this.checkStatusPdf, 5000, orderId, headers);
      },
      (error: Error) => {
        this.pdfStatesByOrderId.set(orderId, { isFetching: false, error });
      },
    );
  };

  @action
  getPdf = (orderId: string, headers: Axios.RequestConfig) => {
    callApi(
      {
        method: 'GET',
        url: `${services.pdfs}/${orderId}`,
        headers,
        responseType: 'blob',
      },
      () => null,
      (file) => {
        this.pdfStatesByOrderId.set(orderId, { isFetching: false });
        const fileName = `order_${orderId}.pdf`;
        const blob = new Blob([file], { type: 'octet/stream' });
        this.downloadPdf(fileName, blob);
      },
      (error: Error) => {
        this.pdfStatesByOrderId.set(orderId, { isFetching: false, error });
      },
    );
  };

  downloadPdf = (fileName: string, blob: Blob) => {
    const aElement = document.createElement('a');
    document.body.appendChild(aElement);
    const href = window.URL.createObjectURL(blob);
    aElement.href = href;
    aElement.download = fileName;
    aElement.click();
    window.URL.revokeObjectURL(href);
    aElement.parentNode!.removeChild(aElement);
  };
}

const pdfStore = new PdfStore();

export { pdfStore };
