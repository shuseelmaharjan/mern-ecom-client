import axios from 'axios';
import config from '../config';

class AuthService{
    constructor() {
        this.api = axios.create({
            baseURL: config.API_BASE_URL,
        })
    }
    //signup logic
    async signup(data){
        try{
            const response = await this.api.post('/api/v1/signup', data); 
            return response.data.message;
        }catch (error) {
            throw new Error(error.response ? error.response.data.message : 'Error signing up');
        }
    }
}

const authService = new AuthService();


export default authService;