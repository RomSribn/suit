import { observable, action } from 'mobx';
import axios, { AxiosResponse } from 'axios';
import { services } from '../config/routes';
import { setUserInfo, resetUserInfo, getUserInfo } from '../utils/apiUtils';
type responseUserData = {
  createDate: string;
  token: string;
  role: Role;
};
class UserClass implements IUserStore {
  @observable isAuth = false;
  @observable profile: Profile = null;
  @observable isFetching = false;
  @observable error: Error | null = null;

  constructor() {
    const userInfo = getUserInfo();
    if (userInfo instanceof Object) {
      this.isAuth = true;
      this.profile = {
        token: userInfo.token,
        user: userInfo.user,
        role: userInfo.role,
      };
    }
  }

  @action fetchLogin(userName: string, password: string) {
    this.isFetching = true;
    return axios
      .post(services.login, {
        login: userName,
        password,
      })
      .then((response: AxiosResponse<responseUserData>) => {
        this.profile = {
          user: userName,
          ...response.data,
        };
        this.isFetching = false;
        if (response.data.token) {
          const data = response.data;
          const userInfo = {
            token: data.token,
            createDate: data.createDate,
            user: userName,
            role: data.role,
          };
          setUserInfo(userInfo);
          this.isAuth = true;
          return userInfo;
        } else {
          throw new Error('Unathorized');
        }
      })
      .catch((error) => {
        this.error = error;
        return {
          error,
        };
      });
  }

  @action logout() {
    this.removeAuth();
  }

  @action removeAuth() {
    this.isFetching = false;
    this.profile = null;
    this.isAuth = false;
    resetUserInfo();
  }
}

export default new UserClass();
