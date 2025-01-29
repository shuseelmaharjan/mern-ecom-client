import axios from "axios";
import config from "../services/config";

const apiURL = config.API_BASE_URL;

export default async function apiHandler(data, url, method, accessToken) {
  try {
    const headers = {
      ...(accessToken && { Authorization: `Bearer ${accessToken}` }),
      "Content-Type": data instanceof FormData ? undefined : "application/json",
    };

    if (!(data instanceof FormData)) {
      headers["Content-Type"] = "application/json";
    }

    const axiosConfig = {
      method: method.toLowerCase(),
      url: apiURL + url,
      data: data,
      headers: headers,
    };

    const response = await axios(axiosConfig);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      if (error.response) {
        try {
          return error.response.data;
        } catch (parseError) {
          console.error("Error parsing response data:", parseError);
          throw new Error("Unexpected response format");
        }
      } else {
        console.error("No response received:", error);
        throw new Error("No response received");
      }
    } else {
      console.error("Unexpected error:", error);
      throw new Error("Unexpected error occurred");
    }
  }
}
