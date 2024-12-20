import axios from 'axios';
import config from '../config';

class AuthService {
    constructor() {
        this.api = axios.create({
            baseURL: config.API_BASE_URL,
            withCredentials: true, // Ensures cookies are sent with requests
        });
    }

    // Validate token logic
    async validateToken() {
        try {
            const response = await this.api.get('/api/v1/check-token'); // Changed to GET request
            return response.data.message; // Return message from API response
        } catch (error) {
            throw new Error(error.response ? error.response.data.message : 'Error validating token');
        }
    }
}

const authService = new AuthService();
export default authService;
