import axios from "axios";
import config from "../config";

class CategoryService {
  constructor() {
    this.api = axios.create({
      baseURL: config.API_BASE_URL,
      withCredentials: true,
    });
  }

  async getCategory() {
    try {
      const response = await this.api.get("/api/v1/categories/all");
      return response;
    } catch (error) {
      console.error(error);
    }
  }
  async createCategory(accessToken, formData) {
    try {
      const response = await this.api.post(
        "/api/v1/create-category",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      return response.data;
    } catch (error) {
      console.error("Error creating category:", error);
      throw error;
    }
  }

  async createSubCategory(accessToken, selectedSubCategoryId, formData) {
    try {
      const response = await this.api.post(
        `/api/v1/subcategory/${selectedSubCategoryId}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      return response.data;
    } catch (error) {
      console.error("Error creating category:", error);
      throw error;
    }
  }

  async createGrandCategory(
    accessToken,
    selectedParentCategoryId,
    selectedParentSubCategoryId,
    formData
  ) {
    try {
      const response = await this.api.post(
        `/api/v1/grandcategory/${selectedParentCategoryId}/${selectedParentSubCategoryId}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      return response.data;
    } catch (error) {
      console.error("Error creating category:", error);
      throw error;
    }
  }

  async removeCategory(accessToken, catId) {
    try {
      const response = await this.api.put(
        `/api/v1/remove-category/${catId}`,
        {},
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      return response;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  async removeCSubategory(accessToken, catId, parentId) {
    try {
      const response = await this.api.put(
        `/api/v1/remove-subcategory/${parentId}/${catId}`,
        {},
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      return response;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  async removeGrandCategory(
    accessToken,
    grandChildCatId,
    grandChildParentId,
    grandChildId
  ) {
    try {
      const response = await this.api.put(
        `/api/v1/remove-grandcategory/${grandChildCatId}/${grandChildParentId}/${grandChildId}`,
        {},
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      return response;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
}

const categoryService = new CategoryService();
export default categoryService;
