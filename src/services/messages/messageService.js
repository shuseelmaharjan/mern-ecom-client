import axios from "axios";
import config from "../config";

class ChatService {
  constructor() {
    this.api = axios.create({
      baseURL: config.API_BASE_URL,
      withCredentials: false,
    });
  }

  async getChatHistory(userId, token) {
    try {
      const response = await this.api.get(`/api/v1/history/${userId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response;
    } catch (error) {
      throw new Error(
        error.response
          ? error.response.data.message || "Error returning chat data"
          : "Error returning chat data"
      );
    }
  }

  async getChatMessage(userId, senderId, token) {
    try {
      const response = await this.api.get(
        `/api/v1/chat/${userId}/${senderId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response;
    } catch (error) {
      throw new Error(
        error.response
          ? error.response.data.message || "Error returning chat data"
          : "Error returning chat data"
      );
    }
  }

  async sendMessage(senderId, receiverId, message, token) {
    try {
      const response = await this.api.post(
        `/api/v1/send`,
        {
          senderId,
          receiverId,
          message,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response;
    } catch (error) {
      throw new Error(
        error.response
          ? error.response.data.message || "Error sending message"
          : "Error sending message"
      );
    }
  }
}

const chatService = new ChatService();
export default chatService;
