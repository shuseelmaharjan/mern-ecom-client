import axios from "axios";
import config from "../config";

class BecomeVendorService{
    constructor(){
        this.api = axios.create({
            baseURL: config.API_BASE_URL,
            withCredientials: true,
        })
    }

    async upgrade(accessToken) {
        try {
            const res = await this.api.put(
                '/api/v1/upgrade-to-vendor',
                {
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${accessToken}`, 
                    },
                }
            );
            console.log('Response:', res.data);
        } catch (error) {
            console.error('Error during upgrade:', error.response?.data || error.message);
        }
    }
    async vendor(data, accessToken) {
        try {
            const response = await this.api.post(
                '/api/v1/create-shop',
                data, 
                {
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${accessToken}`,
                    },
                }
            );
            return response.data;
        } catch (error) {
            console.error('Error while creating shop:', error.response?.data || error.message);
            throw error;
        }
    }
    
    
}

const becomeVendorService = new BecomeVendorService();
export default becomeVendorService;