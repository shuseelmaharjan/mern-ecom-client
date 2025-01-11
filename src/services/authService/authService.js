import axios from "axios";
import config from "../config";

class AuthService {
  constructor() {
    this.api = axios.create({
      baseURL: config.API_BASE_URL,
      withCredentials: true,
    });
  }

  // Signup logic
  async signup(data) {
    try {
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
    try {
      const response = await this.api.post("/api/v1/login", data, {
        withCredentials: true,
        headers: {
          "Content-Type": "application/json",
        },
      });
      return response.data;
    } catch (error) {
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
      const response = await this.api.get("/api/v1/user-info", {
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
          : "Error fetching user info"
      );
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
}

const authService = new AuthService();
export default authService;
