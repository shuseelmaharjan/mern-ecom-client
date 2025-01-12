import axios from "axios";
import config from "../config";

class EmployeeService {
  constructor() {
    this.api = axios.create({
      baseURL: config.API_BASE_URL,
      withCredientials: true,
    });
  }
  async staffs(accessToken) {
    try {
      const response = await this.api.get("/api/v1/active-staffs", {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
      });
      return response.data;
    } catch (error) {
      console.error(
        "Error while creating shop:",
        error.response?.data || error.message
      );
      throw error;
    }
  }

  async employees(accessToken) {
    try {
      const response = await this.api.get("/api/v1/active-employees", {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
      });
      return response.data;
    } catch (error) {
      console.error(
        "Error while creating shop:",
        error.response?.data || error.message
      );
      throw error;
    }
  }

  async removeEmployee(accessToken, userId) {
    try {
      const response = await this.api.patch(`/api/v1/remove-user/${userId}`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
      });
      return response.data;
    } catch (error) {
      console.error(
        "Error removing user",
        error.response.data?.data || error.message
      );
      throw error;
    }
  }
}

const employeeService = new EmployeeService();
export default employeeService;
