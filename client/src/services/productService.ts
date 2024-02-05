import axios, { AxiosResponse } from "axios";
import { Product } from "../models/product";

const API_BASE_URL = "http://localhost:3001/products";

export const productService = {
  getAllProducts: async (
    _id: string = "",
    id: number = 0,
    quantity: number = 0,
    name: string = "",
    price: number = 0,
    category: string = "",
    parent: string = "",
    img: string = ""
  ): Promise<any> => {
    const response = await axios.get(`${API_BASE_URL}/products`, {
      params: { _id, id, quantity, name, price, parent, img, category },
    });
    return response.data;
  },
  getProductById: async (productId: string): Promise<Product | undefined> => {
    try {
      const response = await fetch(`${API_BASE_URL}/${productId}`);
      if (!response.ok) {
        throw new Error("Failed to fetch product");
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error fetching product by ID:", error);
      return undefined;
    }
  },
  getProductsByCategory: async (category: string): Promise<Product[]> => {
    try {
      const response = await axios.get(
        `${API_BASE_URL}/category=${encodeURIComponent(category)}`
      );
      return response.data;
    } catch (error) {
      console.error(`Error fetching products for category ${category}:`, error);
      throw error;
    }
  },

  createProduct: async (product: {
    id: number;
    quantity: number;
    name: string;
    img: string | File; 
    price: number;
    category: string;
    parent: string;
    businessId: string | undefined;
  }) => {
    try {
      const response = await axios.post(
        `${API_BASE_URL}/product`,
        product
      );
      
      return response?.data;
    } catch (error) {
      console.error(`Error in createProduct, in productService.ts: ${error}`);
      throw error; // Re-throw the error to let the calling code handle it
    }
  },

  updateProduct: async (product: {}) => {
    try {
      const response = await axios.post(`${API_BASE_URL}/product/:${product}`);
      return response?.data;
    } catch {}
  },

  readProduct: async (product: {}) => {
    try {
      const response = await axios.post(`${API_BASE_URL}/product/:${product}`);
      return response?.data;
    } catch {}
  },

  deleteProduct: async (product: {}) => {
    try {
      const response = await axios.post(`${API_BASE_URL}/product/:${product}`);
      return response?.data;
    } catch {}
  },

  getProductsBySearch: async (searchQuery: string): Promise<Product[]> => {
    try {
      const response: AxiosResponse<Product[]> = await axios.get(
        `${API_BASE_URL}/search?query=${encodeURIComponent(searchQuery)}`,
        { timeout: 5000 } // Set a timeout value in milliseconds (adjust as needed)
      );
      return response.data;
    } catch (error: any) {
      if (axios.isCancel(error)) {
        console.log('Request canceled:', error.message);
      } else if (error.response) {
        console.log('Server responded with a non-2xx status:', error.response.status);
      } else if (error.code === 'ECONNABORTED') {
        console.log('The request timed out:', error.message);
        // Return a default value or an empty array
        return [];
      } else {
        console.error('Unexpected error:', error.message);
      }
      // Return a default value or an empty array in case of an error
      return [];
      // Re-throw the error only if you want to propagate it further
      // throw error;
    }
  },


};
