import axios from 'axios'
import history from '../history'

export function callApi(config, onRequest, onRequestSuccess, onRequestFailure) {
  onRequest()
  if(Boolean(localStorage.getItem('id_token'))) {
    config.headers = {
      ...config.headers,
      'x-auth-token': localStorage.getItem('id_token')
    }
  }
  // TODO: rmeove this hardcoded shit
  config = {
    ...config,
    params: {
      ...config.params,
      salonId: 1
    }
  }

  return axios(config).then(response => {
    console.log(response)
    onRequestSuccess(response.data, response.headers)
    return response;
  }).catch((error) => {
    if(error.response.status === 401) {
      localStorage.removeItem('AuthUser')
      localStorage.removeItem('id_token')
      history.push('/login')
    }
    onRequestFailure(error)
  })
}
