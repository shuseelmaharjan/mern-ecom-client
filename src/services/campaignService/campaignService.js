import axios from "axios";
import config from "../config";

class MarketingService {
  constructor() {
    this.api = axios.create({
      baseURL: config.API_BASE_URL,
      withCredentials: true,
    });
  }

  async getCampaign(saleType) {
    try {
      const response = await this.api.get(
        `/api/v1/launched-campaigns/${saleType}`
      );
      return response;
    } catch (error) {
      console.error("Error deleting campaign:", error);
      throw error;
    }
  }

  async submitEngagement(accessToken, productId, campaignId, expiryTime) {
    try {
      const response = await this.api.post(
        `/api/v1/create-campaign-engaged`,
        {
          productId,
          campaignId,
          expiryTime,
        },
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
        "Error submitting engagement:",
        error.response?.data?.message || error.message
      );
    }
  }

  async checkEngagement({ productId, campaignId, accessToken }) {
    try {
      const response = await this.api.post(
        `/api/v1/check-engagement`,
        { productId, campaignId },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      return response.data;
    } catch (error) {
      console.error(
        "Error checking engagement:",
        error?.response?.data?.message || error.message
      );
      throw error;
    }
  }
}

const marketingService = new MarketingService();
export default marketingService;
