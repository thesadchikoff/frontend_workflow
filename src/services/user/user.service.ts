import Cookie from "js-cookie";
import { createAxiosClient } from "../../api/http.interceptor";
import { User } from "../../types/auth.types";

class UserService {
  getUserFromLocalStorage() {
    const user = localStorage.getItem("user");
    return user ? JSON.parse(user) : null;
  }

  async getProfile() {
    const client = createAxiosClient();
    const { data } = await client.get("get-me", {
      authorization: true,
    });
    return data.user;
  }

  saveUser(user: User): void {
    localStorage.setItem("user", JSON.stringify(user));
  }

  removeUser() {
    localStorage.removeItem("user");
  }

  saveUserToken(accessToken: string) {
    Cookie.set("accessToken", accessToken);
  }

  getUserToken() {
    const accessToken = Cookie.get("accessToken");
    return accessToken ? accessToken : null;
  }

  removeUserToken() {
    Cookie.remove("accessToken");
  }
}

export default new UserService();
