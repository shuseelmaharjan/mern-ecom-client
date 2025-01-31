import axios from "axios";
import config from "../config";

class ShopService {
  constructor() {
    this.api = axios.create({
      baseURL: config.API_BASE_URL,
      withCredentials: false,
    });
  }

  async getData(accessToken) {
    try {
      const response = await this.api.get("/api/v1/my-shop-details", {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      return response;
    } catch (error) {
      console.error(error);
    }
  }
  async getLogisticServices(accessToken) {
    try {
      const response = await this.api.get("/api/v1/shipping-methods", {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      return response;
    } catch (error) {
      console.error(error);
    }
  }
}
const shopService = new ShopService();
export default shopService;
