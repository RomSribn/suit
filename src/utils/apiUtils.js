// import 'isomorphic-fetch';
//import 'whatwg-fetch';
import jwt_decode from 'jwt-decode';
//import { browserHistory } from 'react-router'

export function checkStatus(response) {
  if (!response.ok) {   // (response.status < 200 || response.status > 300)
    // const error = new Error(response.statusText);
    // error.response = response;
    // throw error;
    return Promise.reject(new Error(response.statusText))
  }
  return Promise.resolve(response)
  // return response;
}

export function parseJSON(response) {
  return response.data;
}

/**
 * A utility to call a restful service.
 *
 * @param url The restful service end point.
 * @param config The config object of the call. Can be null.
 * @param request The request action.
 * @param onRequestSuccess The callback function to create request success action.
 *                 The function expects response json payload as its argument.
 * @param onRequestFailure The callback function to create request failure action.
 *                 The function expects error as its argument.
 */
export function callApi(url, config, request, onRequestSuccess, onRequestFailure) {
  return dispatch => {
    dispatch(request);

    let requestConf = {...config,
      headers: new Headers()
    }
    //if(config && config.body) {
      requestConf.headers.set('Content-Type', 'application/json')
    //}

    if(loadIdToken()) {
      requestConf.headers.set('x-auth-token', loadIdToken())
    }
    return fetch(url, requestConf)
      .then(checkStatus)
      .then(parseJSON)
      .then((json) => {
        dispatch(onRequestSuccess(json));
      })
      .catch((error) => {
        // if(error.error && error.error.message === 'Unauthorized') {
        //   browserHistory['push']('/login')
        // }
        //console.log('err in callApi', error);
        const response = error.response;
        if (response === undefined) {
          dispatch(onRequestFailure(error));
          //console.error(error)
          throw error;
        } else {
          error.status = response.status;
          error.statusText = response.statusText;
          response.text().then( (text) => {
            try {
              const json = JSON.parse(text);
              error.message = json.message;
            } catch (ex) {
              error.message = text;
            }
            dispatch(onRequestFailure(error));
          });
      }
      });
  };
}

export const ID_TOKEN = 'id_token';
const USER_INFO = 'AuthUser';
export function setIdToken(idToken) {
  localStorage.setItem(ID_TOKEN, idToken);
}

/**
 * Устанавливает в localstorage информации о пользователе
 *
 * @param {UserInfo} userInfo
 */
export function setUserInfo(userInfo) {
  setIdToken(userInfo.idToken);
  localStorage.setItem(USER_INFO, JSON.stringify({
    user: userInfo.user,
    token:  userInfo.token,
    createDate: userInfo.createDate,
    role: userInfo.role,
  }));
}

/**
 * @returns {UserInfo | undefined} - Возвращает информацию о пользователе из localStorage
 */
export function getUserInfo() {
  return JSON.parse(localStorage.getItem(USER_INFO));
}

/**
 * Сбрасывает информацию о полтзователе в localStorage
 */
export function resetUserInfo () {
  removeIdToken();
  localStorage.removeItem(USER_INFO);
}

export function removeIdToken() {
  localStorage.removeItem(ID_TOKEN);
}

export function loadIdToken() {
  return localStorage.getItem(ID_TOKEN);
}

export function decodeUserProfile(idToken) {
  try {
    return jwt_decode(idToken);
  } catch (err) {
    return null;
  }
}

export function loadUserProfile() {
  try {
    const idToken = localStorage.getItem(ID_TOKEN);
    const userProfile = jwt_decode(idToken);
    const now = new Date().getTime() / 1000;   // Date().getTime() returns milliseconds.
                                               // So divide by 1000 to get seconds
    if (now > userProfile.exp) {
      // user profile has expired.
      removeIdToken();
      return null;
    }
    return userProfile;
  } catch (err) {
    return null;
  }
}


/**
 * Тип объкта пользовательских данных
 * @typedef {Object} UserInfo
 * @property {string} token - Пользовательский токен получаемся от api
 * @property {string} user - Имя пользователя
 * @property {Date | string} createDate - Дата создания пользователя. От api string
 * @property {'STYLIST' | 'CUSTOMER'} role - Роль пользователя
 */
