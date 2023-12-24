import axios from "axios";

const API_BASE_URL = "https://server-ebay-clone.onrender.com/categories";

export const categoriesService = {
  getAllCategories: async (
    name: string = "", // Make the arguments optional with default values
    parent: string = "",
    img: string = "",
  ): Promise<any> => {
    const response = await axios.get(`${API_BASE_URL}`, {
      params: { name, parent, img }, // Pass the parameters as query parameters
    });
    return response.data;
  },
};
