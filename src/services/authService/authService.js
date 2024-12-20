import axios from 'axios';
import config from '../config';

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
            const response = await this.api.post('/api/v1/signup', data);
            return response.data.message;
        } catch (error) {
            throw new Error(error.response ? error.response.data.message : 'Error signing up');
        }
    }

    // Login logic
    async login(data) {
        try {
          const response = await this.api.post('/api/v1/login', data, {
            withCredentials: true,  
            headers: {
              'Content-Type': 'application/json',
            },
          });
          return response.data;  
        } catch (error) {
          throw new Error(error.response ? error.response.data.message : 'Invalid Credentials');
        }
      }
      

}

const authService = new AuthService();
export default authService;
