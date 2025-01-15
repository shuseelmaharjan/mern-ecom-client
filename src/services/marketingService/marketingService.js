import axios from "axios";
import config from "../config";

class MarketingService {
  constructor() {
    this.api = axios.create({
      baseURL: config.API_BASE_URL,
      withCredentials: true,
    });
  }

  async createCampaign(accessToken, formData) {
    try {
      const response = await this.api.post(
        "/api/v1/create-campaign",
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
      console.error("Error creating campaign:", error);
      throw error;
    }
  }

  async getActiveCampaign(accessToken) {
    try {
      const response = await this.api.get(
        "/api/v1/campaigns/active",
        {},
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      return response.data;
    } catch (error) {
      console.error("Error fetching campaign data:", error);
      throw error;
    }
  }

  async getUpcomingCampaign(accessToken) {
    try {
      const response = await this.api.get(
        "/api/v1/campaigns/upcoming",
        {},
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      return response.data;
    } catch (error) {
      console.error("Error fetching campaign data:", error);
      throw error;
    }
  }

  async getExpiredCampaign(accessToken) {
    try {
      const response = await this.api.get(
        "/api/v1/campaigns/expired",
        {},
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      return response.data;
    } catch (error) {
      console.error("Error fetching campaign data:", error);
      throw error;
    }
  }
}

const marketingService = new MarketingService();
export default marketingService;
