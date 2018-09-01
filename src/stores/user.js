import { observable, action } from 'mobx'
import axios from 'axios'
import { app } from './app'
import { API_ROOT } from '../config/routes';
import { setIdToken, removeIdToken } from '../utils/apiUtils';

class user {
  @observable isAuth
  @observable profile = {}
  @observable isFetching
  @observable error

  constructor(props) {
    this.isAuth = !!localStorage.getItem('AuthUser')
    try {
      this.profile = JSON.parse(localStorage.getItem('AuthUser'))
    } catch (_) {
      this.profile = {}
    }
    // this.profile = ''
  }

  @action fetchLogin(username, password) {
    let url = `${API_ROOT}/api/auth/login`
    this.isFetching = true
    axios.post(url, {
      login: username,
      password
    }).then(response => {
      app.showLoginForm = false
      this.profile = {
        user: username,
        ...response.data
      }
      this.isFetching = false
      if (response.data.user || response.data.token) {
        setIdToken(response.data.token)
        localStorage.setItem('AuthUser', JSON.stringify(this.profile || {
          user: username
        }))
        this.isAuth = true
      } else {
        throw new Error({
          code: 403,
          message: 'unathorized'
        });
      }
    }).catch((error) => {
      this.error = error
    })

  }

  @action logout() {
    let url = `${API_ROOT}/api/auth/logout`
    this.isFetching = true
    axios.get(url, {
      headers: {'x-auth-token': localStorage.getItem('id_token') }
    }).then(response => {
      this.removeAuth()
    }).catch((error) => {
      this.error = error
    })

  }

  @action removeAuth() {
    console.log('history logout')
    this.isFetching = false
    this.profile = {}
    this.isAuth = false
    removeIdToken('')
    localStorage.removeItem('AuthUser')
  }

}

export default new user()
