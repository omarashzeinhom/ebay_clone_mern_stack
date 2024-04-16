import axios from "axios";
import { Product } from "../models/product";
import { API_BASE_URL } from "../utilities/constants";

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
    const response = await axios.get(`${API_BASE_URL}products`, {
      params: { _id, id, quantity, name, price, parent, img, category },
    });
    return response.data;
  },
  getProductById: async (productId: string): Promise<Product | undefined> => {
    try {
      const response = await fetch(`${API_BASE_URL}products/${productId}`);
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
        `${API_BASE_URL}products/category=${encodeURIComponent(category)}`
      );
      return response.data;
    } catch (error) {
      console.error(`Error fetching products for category ${category}:`, error);
      throw error;
    }
  },

  // Adjust the service function to accept productName parameter
  getProductsByName: async (
    productName: string
  ): Promise<Product | undefined> => {
    try {
      const response = await fetch(
        `${API_BASE_URL}products/search-results/${encodeURIComponent(
          productName
        )}`
      );
      if (!response.ok) {
        if (response.status === 429) {
          alert('Search has been disabled because there have been too many attempts. Please wait a minute to reset the rate limit for security purposes.');
        }
        console.error("Failed to fetch product");
      }

      const data = await response.json();
      return data;
    } catch (error:any) {
      console.error("Error fetching products by Name:", error);
     
      return undefined;
    }
  },
  createProduct: async (product: {
    id: number;
    name: string;
    description : string;
    quantity: number;   
    img: string | File;
    price: number;
    category: string;
    parent: string;
    businessId: string | undefined;

  }) => {
    try {
      const response = await axios.post(
        `${API_BASE_URL}products/create/`,
        product
      );

      return response?.data;
    } catch (error) {
      console.error("Error in createProduct, in productService.ts:" + {error});
      throw error; // Re-throw the error to let the calling code handle it
    }
  },

  updateProduct: async (product: {
    id: number;
    name: string;
    description : string;
    quantity: number;   
    img: string | File;
    price: number;
    category: string;
    parent: string;
    businessId: string | undefined;

  }) => {
    try {
      const response = await axios.put(
        `${API_BASE_URL}products/update/:${product?.id}`
      );
      return response?.data;
    } catch (error) {
      console.error("Error in updateProduct, in productService.ts:" + {error});
      throw error; // Re-throw the error to let the calling code handle it
    }
  },


  deleteProduct: async (productId: string) => {
    try {
      const response = await axios.delete(
        `${API_BASE_URL}products/delete/${productId}`
      );
      return response?.data;
    } catch (error) {
      console.error("Error in deleteProduct, in productService.ts:" + {error});
      throw error; // Re-throw the error to let the calling code handle it
    }
  },
};
