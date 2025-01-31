import axios from "axios";
import config from "../config";

class OrderService {
  constructor() {
    this.api = axios.create({
      baseURL: config.API_BASE_URL,
      withCredientials: true,
    });
  }
  async completeDelivery(orderId, accessToken) {
    try {
      const response = await this.api.put(
        `/api/v1/delivered-order/${orderId}`,
        {},
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      return response;
    } catch (error) {
      console.error(
        "Error completing delivery:",
        error.response?.data || error.message
      );
      throw error;
    }
  }
}
const orderService = new OrderService();
export default orderService;
