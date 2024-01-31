import axios from "axios";
import config from "../../shared/config";
import userService from "../user/user.service";

class ShopService {
  async getShopItems() {
    try {
      const { data } = await axios.get(`${config.baseURL}shop`, {
        headers: {
          Authorization: `Bearer ${userService.getUserToken()}`,
        },
      });
      return data;
    } catch (error) {
      return error;
    }
  }
}

export default new ShopService();
