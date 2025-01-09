import axios from "axios";
import config from "../config";

class SiteService {
  constructor() {
    this.api = axios.create({
      baseURL: config.API_BASE_URL,
      withCredentials: false,
    });
  }

  async getData(accessToken) {
    try {
      const response = await this.api.get("/api/v1/site-manager", {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      return response.data;
    } catch (error) {
      throw new Error(
        error.response ? error.response.data.message : "Server error"
      );
    }
  }

  async updateSiteData(dataId, formData, accessToken) {
    try {
      const response = await this.api.put(
        `/api/v1/site-manager/${dataId}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      return response.data;
    } catch (error) {
      console.error("Error updating the logo:", error);

      throw new Error(
        error.response ? error.response.data.message : "Logo update failed"
      );
    }
  }
}

const siteService = new SiteService();
export default siteService;
