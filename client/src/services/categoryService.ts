import axios from "axios";
import { API_BASE_URL } from "../utilities/constants";
<<<<<<< HEAD
=======

>>>>>>> c5d604496437ba0065ccd5ea1300b354cb0234b8

export const categoriesService = {
  getAllCategories: async (
    name: string = "", // Make the arguments optional with default values
    parent: string = "",
    img: string = ""
  ): Promise<any> => {
    const response = await axios.get(`${API_BASE_URL}categories`, {
      params: { name, parent, img }, // Pass the parameters as query parameters
    });
    return response.data;
  },
};
