import axios from "axios";
import { Product } from "../models/product";

const API_BASE_URL = "https://server-ebay-clone.onrender.com/products";

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
    const response = await axios.get(`${API_BASE_URL}`, {
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
      const response = await axios.get(
        `${API_BASE_URL}/search?query=${encodeURIComponent(searchQuery)}`
      );
      return response.data;
    } catch (error) {
      console.error(
        `Error fetching products for search query ${searchQuery}:`,
        error
      );
      throw error;
    }
  },
};
