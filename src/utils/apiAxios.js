import axios from 'axios'
import { logoutForce } from 'Actions/auth'

export function callApi(config, request, onRequestSuccess, onRequestFailure) {
  return (dispatch, getState) => {
    dispatch(request())
    if(!!localStorage.getItem('id_token')) {
      config.headers = {
        ...config.headers,
        'x-auth-token': localStorage.getItem('id_token')
      }
    }
    return axios(config).then(response => {
      dispatch(onRequestSuccess(response.data))
    }).catch((error) => {
      if(error.response.status === 401) {
        dispatch(logoutForce())
      }
      dispatch(onRequestFailure(error))
    })
  }
}
