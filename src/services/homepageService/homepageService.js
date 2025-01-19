import axios from "axios";
import config from "../config";

class AuthService {
  constructor() {
    this.api = axios.create({
      baseURL: config.API_BASE_URL,
      withCredentials: true,
    });
  }

  // Validate token logic
  async validateToken() {
    try {
      const response = await this.api.get("/api/v1/check-token");
      return response.data.message;
    } catch (error) {
      throw new Error(
        error.response ? error.response.data.message : "Error validating token"
      );
    }
  }

  async getBanners() {
    try {
      const response = await this.api.get("/api/v1/banner-campaigns");
      return response.data.data;
    } catch (error) {
      console.error(error.error.message);
    }
  }

  async getCategories() {
    try {
      const response = await this.api.get("/api/v1/client-categories");
      return response;
    } catch (error) {
      console.error(error.error.message);
    }
  }

  async getHeaderCampaigns() {
    try {
      const response = await this.api.get("/api/v1/header-campaigns");
      return response;
    } catch (error) {
      console.error(error);
    }
  }

  async flashSaleItems() {
    try {
      const response = await this.api.get("/api/v1/flashsale-products");
      return response;
    } catch (error) {
      console.error(error);
    }
  }

  async individualProductProperty(ProductId) {
    try {
      const response = await this.api.get(`/api/v1/product/${ProductId}`);
      return response;
    } catch (error) {
      console.error(error);
    }
  }

  async getBreadCrumbDetails(ProductId) {
    try {
      const response = await this.api.get(
        `/api/v1/product-category-details/${ProductId}`
      );
      return response;
    } catch (error) {
      console.error(error);
    }
  }
}

const authService = new AuthService();
export default authService;
