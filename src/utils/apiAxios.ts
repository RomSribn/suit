import axios from 'axios';
import history from '../history';

// tslint:disable-next-line no-any
type AnyFunction<A = any, B = any> = (firts?: A, second?: B) => any;

/* tslint:disable no-any no-console */ 
export function callApi(
    /* tslint:enable no-any */ 
  config: Axios.RequestConfig,
  onRequest?: AnyFunction,
  onRequestSuccess?: AnyFunction,
  onRequestFailure?: AnyFunction) {
  if (onRequest) {
    onRequest();
  }
  if (
    Boolean(localStorage.getItem('AuthUser') &&
    JSON.parse(localStorage.getItem('AuthUser')!)
  )) {
    const user = JSON.parse(localStorage.getItem('AuthUser')!);
    config.headers = {
      ...config.headers,
      'x-auth-token': user.token,
      'stylist-token': user.token
    };
  }
  // TODO: rmeove this hardcoded shit
  config = {
    ...config,
    params: {
      ...config.params,
      salonId: 1
    }
  };

  return axios(config).then((response): Axios.Response => {
    if (typeof onRequestSuccess === 'function') {
      onRequestSuccess(response.data, response.headers);      
    }
    return response as Axios.Response;
  }).catch((error) => {
    if (error.response.status === 401) {
      localStorage.removeItem('AuthUser');
      history.push('/login');
    }
    if (typeof onRequestFailure === 'function') {
      onRequestFailure(error);
    }
  });
}
