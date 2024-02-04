import axios from "axios";
import { toaster } from "evergreen-ui";
import config from "../../shared/config";
import { MyShopItem, ShopItem } from "../../types/shop.type";
import userService from "../user/user.service";
import {
  createAxiosClient,
  httpInterceptorWithToken,
} from "../../api/http.interceptor";

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
  async buyShopItem(product: ShopItem) {
    try {
      const { data } = await axios.get(`${config.baseURL}buy/${product.id}`, {
        headers: {
          Authorization: `Bearer ${userService.getUserToken()}`,
        },
      });
      toaster.success("Покупка совершена успешно");
      return data;
    } catch (error) {
      toaster.danger(error.response.data);
      return error;
    }
  }

  async useProductItem(item: MyShopItem) {
    try {
      const { data } = await axios.delete(
        `${config.baseURL}use-my-item/${item.uniq_id}`,
        {
          headers: {
            Authorization: `Bearer ${userService.getUserToken()}`,
          },
        }
      );
      toaster.success(`Вы использовали привелегию "${item.title}"`);
      return data;
    } catch (error) {
      return error;
    }
  }

  async getMyItems() {
    // const { data } = await axios.get(`${config.baseURL}my-items`, {
    //   headers: {
    //     Authorization: `Bearer ${userService.getUserToken()}`,
    //   },
    // });
    const client = createAxiosClient();
    const { data } = await client.get("my-items", {
      authorization: true,
    });
    return data;
  }
}

export default new ShopService();
