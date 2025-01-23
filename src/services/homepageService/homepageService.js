import axios from "axios";
import config from "../config";

class HomepageService {
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

  async foryoupageItems() {
    try {
      const response = await this.api.get("/api/v1/foryoupage");
      return response.data.data;
    } catch (error) {
      console.error(error);
    }
  }

  async getRelatedProducts(productId) {
    try {
      const response = await this.api.get(
        `/api/v1/related-products/${productId}`
      );
      return response.data.data;
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

  async getDefaultAddress(accessToken) {
    try {
      const response = await this.api.get("/api/v1/get-my-default-address", {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${accessToken}`,
        },
      });
      return response;
    } catch (error) {
      console.error(error);
    }
  }

  async getProductCartDetails(cartDetails) {
    const products = cartDetails.map((item) => ({
      productId: item.productId,
      quantity: item.quantity,
    }));

    try {
      const response = await this.api.post("/api/v1/products-costing", {
        products,
      });
      return response.data.results;
    } catch (error) {
      console.error("Error fetching product data:", error);
      throw error;
    }
  }

  async fetchProducts(categoryId, page = 1, filterParams = {}) {
    try {
      const response = await this.api.get(
        `/api/v1/product-category/${categoryId}`,
        {
          params: { page, limit: 20, ...filterParams },
        }
      );
      return response.data;
    } catch (error) {
      console.error("Error fetching products:", error);
      throw error;
    }
  }

  async fetchFilterAttributes(categoryId) {
    try {
      const response = await this.api.get(
        `/api/v1/category/${categoryId}/filter-attributes`
      );
      return response.data;
    } catch (error) {
      console.error("Error fetching filter attributes:", error);
      throw error;
    }
  }
  async fetchFilteredProducts(categoryId, filterParams, page = 1, limit = 2) {
    try {
      const response = await this.api.get(
        `/api/v1/category-filter/${categoryId}`,
        {
          params: { ...filterParams, page, limit },
        }
      );
      return response.data;
    } catch (error) {
      console.error("Error fetching filtered products:", error);
      throw error;
    }
  }

  async fetchProducts1(subCategoryId, page = 1, filterParams = {}) {
    try {
      const response = await this.api.get(
        `/api/v1/product-subcategory/${subCategoryId}`,
        {
          params: { page, limit: 20, ...filterParams },
        }
      );
      return response.data.data;
    } catch (error) {
      console.error("Error fetching products:", error);
      throw error;
    }
  }

  async fetchFilteredProducts1(
    subCategoryId,
    filterParams,
    page = 1,
    limit = 2
  ) {
    try {
      const response = await this.api.get(
        `/api/v1/subcategory-filter/${subCategoryId}`,
        {
          params: { ...filterParams, page, limit },
        }
      );
      return response.data;
    } catch (error) {
      console.error("Error fetching filtered products:", error);
      throw error;
    }
  }

  async fetchProducts2(grandCatId, page = 1, filterParams = {}) {
    try {
      const response = await this.api.get(
        `/api/v1/product-grandcategory/${grandCatId}`,
        {
          params: { page, limit: 20, ...filterParams },
        }
      );
      return response.data.data;
    } catch (error) {
      console.error("Error fetching products:", error);
      throw error;
    }
  }

  async fetchFilteredProducts2(grandCatId, filterParams, page = 1, limit = 2) {
    try {
      const response = await this.api.get(
        `/api/v1/grandcategory-filter/${grandCatId}`,
        {
          params: { ...filterParams, page, limit },
        }
      );
      return response.data;
    } catch (error) {
      console.error("Error fetching filtered products:", error);
      throw error;
    }
  }
  async getCampaignStatus() {
    try {
      const response = await this.api.get("/api/v1/campaign-status");
      return response;
    } catch (error) {
      console.error(error);
    }
  }
  async getHeaderCampaign() {
    try {
      const response = await this.api.get("/api/v1/header-campaigns");
      return response;
    } catch (error) {
      console.error(error);
    }
  }

  async getTodayDealDatas() {
    try {
      const response = await this.api.get("/api/v1/todays-deal");
      return response;
    } catch (error) {
      console.error(error);
    }
  }
}

const homepageService = new HomepageService();
export default homepageService;
