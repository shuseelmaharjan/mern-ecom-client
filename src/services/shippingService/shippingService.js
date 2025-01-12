import axios from "axios";
import config from "../config";

class ShippingService {
  constructor() {
    this.api = axios.create({
      baseURL: config.API_BASE_URL,
      withCredientials: true,
    });
  }

  async getShippingDetails(accessToken) {
    try {
      const response = await this.api.get("/api/v1/get-my-shipping-address", {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
      });
      return response.data.shippingAddresses;
    } catch (error) {
      console.error(
        "Error fetching shipping datas:",
        error.response?.data || error.message
      );
      throw error;
    }
  }

  async addShippingDetails(accessToken, formData) {
    try {
      const response = await this.api.post(
        "/api/v1/useraddress/add",
        formData,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      return response.data;
    } catch (error) {
      console.error(
        "Failed to add address",
        error.response?.data || error.message
      );
    }
  }

  async getIndividualShippingDetails(accessToken, id) {
    try {
      const response = await this.api.get(`/api/v1/shipping-address/${id}`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
      });
      return response.data;
    } catch (error) {
      console.error(
        "Failed to get address",
        error.response?.data || error.message
      );
    }
  }

  async updateAddress(accessToken, id, formData) {
    try {
      const response = await this.api.put(
        `/api/v1/shippingaddress/update/${id}`,
        formData,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      return response.data;
    } catch (error) {
      console.error(
        "Failed to get address",
        error.response?.data || error.message
      );
    }
  }
}
const shippingService = new ShippingService();
export default shippingService;
