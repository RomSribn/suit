// Скорпированные декларации с node_modules/axios/index.d.ts
declare namespace Axios {
    interface Transformer {
        (data: any, headers?: any): any;
      }
      
    interface Adapter {
        (config: RequestConfig): AxiosPromise<any>;
    }
      
    interface BasicCredentials {
        username: string;
        password: string;
    }
      
    interface ProxyConfig {
        host: string;
        port: number;
        auth?: {
          username: string;
          password:string;
        }
    }
      
      interface RequestConfig {
        url?: string;
        method?: string;
        baseURL?: string;
        transformRequest?: Transformer | Transformer[];
        transformResponse?: Transformer | Transformer[];
        headers?: any;
        params?: any;
        paramsSerializer?: (params: any) => string;
        data?: any;
        timeout?: number;
        withCredentials?: boolean;
        adapter?: Adapter;
        auth?: BasicCredentials;
        responseType?: string;
        xsrfCookieName?: string;
        xsrfHeaderName?: string;
        onUploadProgress?: (progressEvent: any) => void;
        onDownloadProgress?: (progressEvent: any) => void;
        maxContentLength?: number;
        validateStatus?: (status: number) => boolean;
        maxRedirects?: number;
        httpAgent?: any;
        httpsAgent?: any;
        proxy?: ProxyConfig | false;
        cancelToken?: CancelToken;
      }
      
      interface Response<T = any>  {
        data: T;
        status: number;
        statusText: string;
        headers: any;
        config: RequestConfig;
        request?: any;
      }
      
      interface AxiosError extends Error {
        config: RequestConfig;
        code?: string;
        request?: any;
        response?: Response;
      }
      
      interface AxiosPromise<T = any> extends Promise<Axios.Response<T>> {
    }
      
      interface CancelStatic {
        new (message?: string): Cancel;
      }
      
      interface Cancel {
        message: string;
      }
      
      interface Canceler {
        (message?: string): void;
      }
      
      interface CancelTokenStatic {
        new (executor: (cancel: Canceler) => void): CancelToken;
        source(): CancelTokenSource;
      }
      
      interface CancelToken {
        promise: Promise<Cancel>;
        reason?: Cancel;
        throwIfRequested(): void;
      }
      
      interface CancelTokenSource {
        token: CancelToken;
        cancel: Canceler;
      }
      
      interface InterceptorManager<V> {
        use(onFulfilled?: (value: V) => V | Promise<V>, onRejected?: (error: any) => any): number;
        eject(id: number): void;
      }
      
      interface Instance {
        (config: RequestConfig): AxiosPromise;
        (url: string, config?: RequestConfig): AxiosPromise;
        defaults: RequestConfig;
        interceptors: {
          request: InterceptorManager<RequestConfig>;
          response: InterceptorManager<Response>;
        };
        request<T = any>(config: RequestConfig): AxiosPromise<T>;
        get<T = any>(url: string, config?: RequestConfig): AxiosPromise<T>;
        delete(url: string, config?: RequestConfig): AxiosPromise;
        head(url: string, config?: RequestConfig): AxiosPromise;
        post<T = any>(url: string, data?: any, config?: RequestConfig): AxiosPromise<T>;
        put<T = any>(url: string, data?: any, config?: RequestConfig): AxiosPromise<T>;
        patch<T = any>(url: string, data?: any, config?: RequestConfig): AxiosPromise<T>;
      }
      
      interface Static extends Instance {
        create(config?: RequestConfig): Instance;
        Cancel: CancelStatic;
        CancelToken: CancelTokenStatic;
        isCancel(value: any): boolean;
        all<T>(values: (T | Promise<T>)[]): Promise<T[]>;
        spread<T, R>(callback: (...args: T[]) => R): (array: T[]) => R;
      }
      
    const Axios: Static;
}