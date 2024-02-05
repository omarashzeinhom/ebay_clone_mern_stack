import axios from "axios";
import { API_BASE_URL } from "../utilities/constants";


export const categoriesService = {
  getAllCategories: async (
    name: string = "", // Make the arguments optional with default values
    parent: string = "",
    img: string = "",
  ): Promise<any> => {
    const response = await axios.get(`${API_BASE_URL}categories`, {
      params: { name, parent, img }, // Pass the parameters as query parameters
    });
    return response.data;
  },
};
