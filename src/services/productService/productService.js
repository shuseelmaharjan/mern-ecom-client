import axios from "axios";
import config from "../config";

class ProductService {
  constructor() {
    this.api = axios.create({
      baseURL: config.API_BASE_URL,
      withCredentials: false,
    });
  }

  // Add product logic
  async addProduct(data, token) {
    try {
      const response = await this.api.post("/api/v1/create-product", data, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data.message;
    } catch (error) {
      throw new Error(
        error.response
          ? error.response.data.message || "Error adding product"
          : "Error adding product data"
      );
    }
  }

  async getVendorsProduct(token) {
    try {
      const response = await this.api.get("/api/v1/vendor-product", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error) {
      console.error(error);
    }
  }
  async getInactiveVendorsProducts(token) {
    try {
      const response = await this.api.get("/api/v1/inactive-vendor-product", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error) {
      console.error(error);
    }
  }
}

const productService = new ProductService();
export default productService;
