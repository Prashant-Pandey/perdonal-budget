import Axios from 'axios';
import { getCookie, deleteCookie } from '../commons/cookie';
import connectAPI from './commonService';
const AUTH_URL = "http://localhost:3000" + "/auth/"
export class AuthService {
  async login(loginJSON) {
    const withCredentials = true, method = 'post', service = 'auth/login', headers = {}, params = {}, body = loginJSON;
    return await connectAPI({method, service, headers, params, body, withCredentials})
  }

  async signup(signupJSON) {
    const withCredentials = true, method = 'post', service = 'auth/signup', headers = {}, params = {}, body = signupJSON;
    return await connectAPI({method, service, headers, params, body, withCredentials})
  }

  async refresh() {
    const withCredentials = true, method = 'post', service = 'auth/refresh', headers = {
      Authorization: `Bearer ${getCookie('token')}`
    }, params = {}, body = {};
    return await connectAPI({method, service, headers, params, body, withCredentials})
  }

  async logout() {
    try {
      return deleteCookie("token");
    } catch (e) {
      return false;
    }
  }

}