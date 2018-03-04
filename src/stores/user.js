import { observable, action } from 'mobx'
import axios from 'axios'
import app from './app'
import { API_ROOT } from '../config/routes'
import { setIdToken, removeIdToken } from '../utils/apiUtils'

class user {
  @observable isAuth
  @observable profile = {}
  @observable isFetching
  @observable error

  constructor(props) {
    this.isAuth = !!localStorage.getItem('AuthUser')
    this.profile = JSON.parse(localStorage.getItem('AuthUser'))
  }

  @action fetchLogin(username, password) {
    let url = `http://${API_ROOT}/api/auth/login`
    this.isFetching = true
    axios.post(url, {
      username,
      password
    }).then(response => {
      app.showLoginForm = false
      this.profile = response.data
      this.isAuth = true
      this.isFetching = false
      setIdToken(response.data.token)
      localStorage.setItem('AuthUser', JSON.stringify(response.data.user))
    }).catch((error) => {
      this.error = error
    })

  }

  @action logout() {
    let url = `http://${API_ROOT}/api/auth/logout`
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
