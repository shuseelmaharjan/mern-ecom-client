import axios from "axios";
import config from "../config";

class SiteService {
  constructor() {
    this.api = axios.create({
      baseURL: config.API_BASE_URL,
      withCredentials: false,
    });
  }

  async createSitePolicy(data, accessToken) {
    try {
      const response = await this.api.post("/api/v1/create-site-policy", data, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      return response.data;
    } catch (error) {
      console.error("Error creating site policy:", error);
    }
  }

  async getSitePolicyData() {
    try {
      const response = await this.api.get("/api/v1/get-site-policy");
      return response;
    } catch (error) {
      console.error("Error getting site policy data:", error);
    }
  }

  async updatePolicy(policyId, data, accessToken) {
    try {
      const response = await this.api.put(
        `/api/v1/update-site-policy/${policyId}`,
        data,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      return response;
    } catch (error) {
      console.error("Error updating site policy data:", error);
    }
  }
}

const siteService = new SiteService();
export default siteService;