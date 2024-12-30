import axios from 'axios';
import config from '../config';

class ProductService {
  constructor() {
    this.api = axios.create({
      baseURL: config.API_BASE_URL,
      withCredentials: true,
    });
  }

  // Add product logic
  async addProduct(data, token) {
    try {
      const response = await this.api.post('/api/v1/add-product', data, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data.message;
    } catch (error) {
      throw new Error(
        error.response
          ? error.response.data.message || 'Error adding product'
          : 'Error adding product data'
      );
    }
  }
}

const productService = new ProductService();
export default productService;
