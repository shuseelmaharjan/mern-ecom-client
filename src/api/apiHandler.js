import axios from "axios";
import config from "../services/config";

const apiURL = config.API_BASE_URL;

export default async function apiHandler(data, url, method, accessToken) {
  try {
    const axiosConfig = {
      method: method.toLowerCase(),
      url: apiURL + url,
      data: data,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
    };

    const response = await axios(axiosConfig);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      if (
        error.response &&
        error.response.status >= 400 &&
        error.response.status < 500
      ) {
        console.error("Response data:", error.response.data);
      }
    } else {
      console.error("Unexpected error:", error);
    }
  }
}
