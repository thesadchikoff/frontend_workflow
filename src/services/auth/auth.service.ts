import Cookies from "js-cookie";
import { httpInterceptor } from "../../api/http.interceptor.ts";
import {
  LoginData,
  LoginResponse,
  RegisterData,
} from "../../types/auth.types.ts";
import userService from "../user/user.service.ts";

class AuthService {
  async login(userData: LoginData) {
    const { data } = await httpInterceptor.post<LoginResponse>(
      "login",
      userData
    );
    // Cookies.set('accessToken', data.token)
    userService.saveUserToken(data.token);
    console.log(data.token === userService.getUserToken());
    console.log(data.token);
    console.log(userService.getUserToken());
    userService.saveUser(data.user);
    return data;
  }
  logout() {
    userService.removeUserToken();
    userService.removeUser();
  }
  async register(userData: RegisterData) {
    const { data } = await httpInterceptor.post<LoginResponse>(
      "register",
      userData
    );
    if (data?.token) {
      Cookies.set("accessToken", data.token);
    }
    userService.saveUser(data.user);
    return data;
  }
}

export default new AuthService();
