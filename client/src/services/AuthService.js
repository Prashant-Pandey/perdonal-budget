import Axios from 'axios';
import { getCookie, deleteCookie } from '../commons/cookie';
const AUTH_URL = "http://localhost:3000"+"/auth/"
export class AuthService {
  async login(loginJSON) {
    console.log(process.env.BACKEND);
    const res = await Axios.post(AUTH_URL + "login",
      JSON.stringify(loginJSON), {
      headers: {
        "Content-Type": "application/json"
      },
      withCredentials: true,
    });
    return res.data;
  }

  async signup(signupJSON) {
    const res = await Axios.post(AUTH_URL + "signup",
      JSON.stringify(signupJSON), {
      headers: {
        'Content-Type': 'application/json'
      },
      withCredentials: true
    });
    return res.data;
  }

  logout() {
    deleteCookie("token");
  }

}