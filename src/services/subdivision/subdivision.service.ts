import axios from "axios";
import config from "../../shared/config";
import userService from "../user/user.service";
import { toaster } from "evergreen-ui";
import { createAxiosClient } from "../../api/http.interceptor";

class SubdivisionService {
  async getSubdivisions() {
    try {
      const { data } = await axios.get(`${config.baseURL}all-subdivisions`, {
        headers: {
          Authorization: `Bearer ${userService.getUserToken()}`,
        },
      });
      return data;
    } catch (error) {
      return error;
    }
  }

  async getInvites() {
    const client = createAxiosClient();
    const { data } = await client.get("invited-list");
    return data;
  }

  async getInviteToSubdivision(subdivision: Subdivision) {
    try {
      const { data } = await axios.get(
        `${config.baseURL}request-invite/${subdivision.subdivision_id}`,
        {
          headers: {
            Authorization: `Bearer ${userService.getUserToken()}`,
          },
        }
      );
      toaster.notify(
        `Вы отправили заявку на вступление в отдел ${subdivision.name}`
      );
      return data;
    } catch (error) {
      return error;
    }
  }
}

export default new SubdivisionService();
