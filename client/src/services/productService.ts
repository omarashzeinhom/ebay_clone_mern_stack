import axios from "axios";

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
};
