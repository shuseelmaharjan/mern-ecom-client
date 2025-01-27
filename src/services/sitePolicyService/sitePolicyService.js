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

  async getShippingPolicyData() {
    try {
      const response = await this.api.get("/api/v1/get-shipping-policy");
      return response;
    } catch (error) {
      console.error(error);
    }
  }

  async createShippingPolicy(data, accessToken) {
    try {
      const response = await this.api.post(
        "/api/v1/create-shipping-policy",
        data,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      return response.data;
    } catch (error) {
      console.error("Error creating shipping policy:", error);
    }
  }

  async deactivateShippingPolicy(policyId, accessToken) {
    try {
      const response = await this.api.put(
        `/api/v1/deactivate-shipping-policy/${policyId}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      return response;
    } catch (error) {
      console.error(error);
    }
  }

  async updateShippingPolicy(data, accessToken, policyId) {
    try {
      const response = await this.api.put(
        `/api/v1/update-shipping-policy/${policyId}`,
        data,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      return response;
    } catch (error) {
      console.error(error);
    }
  }

  async createReturnPolicy(data, accessToken) {
    try {
      const response = await this.api.post(
        "/api/v1/create-return-policy",
        data,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      return response.data;
    } catch (error) {
      console.error("Error creating site policy:", error);
    }
  }

  async getSiteReturnPolicyData() {
    try {
      const response = await this.api.get("/api/v1/get-return-policy");
      return response;
    } catch (error) {
      console.error("Error getting site return policy data:", error);
    }
  }

  async updateReturnPolicy(policyId, data, accessToken) {
    try {
      const response = await this.api.put(
        `/api/v1/update-return-policy/${policyId}`,
        data,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      return response;
    } catch (error) {
      console.error("Error updating site return policy data:", error);
    }
  }

  async getShopShippingPolicyData(shopId) {
    try {
      const response = await this.api.get(
        `/api/v1/${shopId}/shipping-policies`
      );
      return response;
    } catch (error) {
      console.error(error);
    }
  }

  async deactivateShopShippingPolicy(policyId, accessToken) {
    try {
      const response = await this.api.put(
        `/api/v1/deactivate-shop-shipping-policy/${policyId}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      return response;
    } catch (error) {
      console.error(error);
    }
  }
}

const siteService = new SiteService();
export default siteService;
