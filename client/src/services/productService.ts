import axios from "axios";
import { Product } from "../models/product";

const API_BASE_URL = "http://localhost:3001/products";

export const productService = {
  getAllProducts: async (
    name: string = "",
    price: number = 0,
    parent: string = "",
    img: string = ""
  ): Promise<any> => {
    const response = await axios.get(API_BASE_URL, {
      params: { name, price, parent, img },
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
};
