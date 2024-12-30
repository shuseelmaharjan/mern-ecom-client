import axios from "axios";
import config from "../config";

class SiteService{
    constructor() {
        this.api = axios.create({
            baseURL:config.API_BASE_URL,
            withCredentials:false,
        })
    }

    async getData(){
        try{
            const response = await this.api.get('/api/v1/site-manager');
            return response.data;

        }catch(error){
            throw new Error(error.response?error.response.data.message:"server error");
        }
    }
}


const siteService = new SiteService();
export default siteService;