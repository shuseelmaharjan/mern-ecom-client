import axios from "axios";
import config from "../config";

class AuthService {
  constructor() {
    this.api = axios.create({
      baseURL: config.API_BASE_URL,
      withCredentials: true,
    });
  }

  getHeaders(accessToken, contentType = "application/json") {
    return {
      "Content-Type": contentType,
      Authorization: `Bearer ${accessToken}`,
    };
  }

  // Signup logic
  async signup(data) {
    try {
      console.log("request api:", this.api);
      const response = await this.api.post("/api/v1/signup", data);
      return response.data.message;
    } catch (error) {
      throw new Error(
        error.response ? error.response.data.message : "Error signing up"
      );
    }
  }

  // Login logic
  async login(data) {
    console.log(data);
    try {
      const response = await this.api.post("/api/v1/login", data, {
        withCredentials: true,
        headers: {
          "Content-Type": "application/json",
        },
      });
      return response.data;
    } catch (error) {
      console.log(error);
      throw new Error(
        error.response ? error.response.data.message : "Invalid Credentials"
      );
    }
  }

  //logout logic
  async logout() {
    try {
      const response = await this.api.post("/api/v1/logout", {
        withCredentials: true,
        headers: {
          "Content-Type": "application/json",
        },
      });
      console.log(response.data);
      return response.data;
    } catch (error) {
      throw new Error(
        error.response ? error.response.data.message : "Error logging out"
      );
    }
  }

  //user info
  async userInfo(accessToken) {
    try {
      const headers = this.getHeaders(accessToken);

      const response = await this.api.get("/api/v1/user-info", { headers });
      return response.data;
    } catch (error) {
      throw new Error(
        error.response
          ? error.response.data.message
          : "Error fetching user info"
      );
    }
  }

  async settingProfileInfo(accessToken, userId) {
    try {
      const headers = this.getHeaders(accessToken);
      const response = await this.api.get(`/api/v1/setting-profile/${userId}`, {
        headers,
      });

      return response.data;
    } catch (error) {
      const errorMessage =
        error.response?.data?.message ||
        "Error fetching user profile information";
      console.error("Error in settingProfileInfo:", errorMessage);
      throw new Error(errorMessage);
    }
  }

  async updateProfileImage(accessToken, userId, formData) {
    try {
      const headers = {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "multipart/form-data",
      };

      const response = await this.api.post(
        `/api/v1/upload-profile-image/${userId}`,
        formData,
        { headers }
      );

      return response.data;
    } catch (error) {
      console.error("Error uploading profile image:", error);
      throw new Error(error.response?.data?.message || "Error uploading image");
    }
  }
  async updateUserName(accessToken, userId, name) {
    try {
      const response = await this.api.put(
        `/api/v1/update-name/${userId}`,
        name,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      return response;
    } catch (error) {
      throw new Error(error.response?.data?.message || "Error updating name");
    }
  }
  async updateEmail(accessToken, userId, email) {
    try {
      const response = await this.api.put(
        `/api/v1/update-email/${userId}`,
        email,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      return response;
    } catch (error) {
      throw new Error(error.response?.data?.message || "Error updating name");
    }
  }

  async shopInfo(accessToken) {
    try {
      const response = await this.api.get("/api/v1/myshop", {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
      });
      return response.data;
    } catch (error) {
      throw new Error(
        error.response
          ? error.response.data.message
          : "Error fetching shop details"
      );
    }
  }

  async addEmployee(accessToken, formData) {
    try {
      const response = await this.api.post(
        "/api/v1/create-employee",
        formData,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      return response.data;
    } catch (error) {
      throw new Error(
        error.response ? error.response.data.message : "Error adding user"
      );
    }
  }
  async updateUserData(accessToken, formData, userId) {
    try {
      const response = await this.api.patch(
        `/api/v1/update-user/${userId}`,
        formData,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      return response.data;
    } catch (error) {
      throw new Error(
        error.response ? error.response.data.message : "Error adding user"
      );
    }
  }

  async getUserInfo(accessToken, userId) {
    try {
      const response = await this.api.get(`/api/v1/users/${userId}`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
      });
      return response.data;
    } catch (error) {
      throw new Error(
        error.response ? error.response.data.message : "Failed to get user info"
      );
    }
  }

  async changePassword(oldPassword, newPassword, accessToken) {
    try {
      const response = await this.api.put(
        "/api/v1/change-password",
        { oldPassword, newPassword },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      return response.data;
    } catch (error) {
      throw new Error(
        error.response?.data?.message || "Failed to change password."
      );
    }
  }
}

const authService = new AuthService();
export default authService;
