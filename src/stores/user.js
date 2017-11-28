import { observable } from 'mobx'
import axios from 'axios'
import history from '../history'
import routes from '../config/routes'
import { setIdToken, removeIdToken } from '../utils/apiUtils'

class user {
  @observable isAuth
  @observable.shallow profile = {}
  @observable isFetching
  @observable error

  constructor(props) {
    this.isAuth = !!localStorage.getItem('AuthUser')
    this.profile = JSON.parse(localStorage.getItem('AuthUser'))
  }

  get isAuth() {
    return this.isAuth
  }

  fetchLogin(username, password) {
    let url = `http://${routes.API_ROOT}/api/auth/login`
    this.isFetching = true
    axios.post(url, {
      username,
      password
    }).then(response => {
      this.isFetching = false
      this.profile = response.data
      setIdToken(response.data.token)
      localStorage.setItem('AuthUser', JSON.stringify(response.data.user))
      history.push('/')
    }).catch((error) => {
      this.error = error
    })

  }

  logout() {
    let url = `http://${routes.API_ROOT}/api/auth/logout`
    this.isFetching = true
    axios.get(url, {
      headers: {'x-auth-token': localStorage.getItem('id_token') }
    }).then(response => {
      this.removeAuth()
    }).catch((error) => {
      this.error = error
    })

  }

  removeAuth() {
    console.log('history logout')
    this.isFetching = false
    this.profile = {}
    removeIdToken('')
    localStorage.removeItem('AuthUser')
    history.push('/login')
  }

}

export default new user()
