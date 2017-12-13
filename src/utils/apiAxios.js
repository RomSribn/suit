import axios from 'axios'
import history from '../history'

export function callApi(config, onRequest, onRequestSuccess, onRequestFailure) {
  onRequest()
  if(!!localStorage.getItem('id_token')) {
    config.headers = {
      ...config.headers,
      'x-auth-token': localStorage.getItem('id_token')
    }
  }
  return axios(config).then(response => {
    console.log(response)
    onRequestSuccess(response.data, response.headers)
  }).catch((error) => {
    if(error.response.status === 401) {
      localStorage.removeItem('AuthUser')
      localStorage.removeItem('id_token')
      history.push('/login')
    }
    onRequestFailure(error)
  })
}
