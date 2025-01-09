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
}

const siteService = new SiteService();
export default siteService;
