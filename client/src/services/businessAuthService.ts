import axios, { AxiosResponse } from "axios";
import { Business } from "../models";
import { API_BASE_URL } from "../utilities/constants";

export const businessAuthService = {
  /* <--- Business services start ---> */

  registerBusiness: async (
    businessName: string,
    businessEmail: string,
    businessPassword: string,
    businessLocation: string,
    businessActive: boolean,
    businessAvatar?: string
  ): Promise<void> => {
    try {
      const response = await axios.post(`${API_BASE_URL}/auth/registerb`, {
        businessName,
        businessEmail,
        businessPassword,
        businessLocation: businessLocation || " ",
        businessActive: businessActive || true,
        businessAvatar: businessAvatar || " ",
      });

      console.log("Business registration response:", response.data);
    } catch (error) {
      console.error("Business registration failed:", error);
      throw error; // Rethrow the error to be caught in the calling function
    }
  },

  loginBusiness: async (
    businessEmail: string,
    businessPassword: string
  ): Promise<string> => {
    try {
      const response: AxiosResponse<{ token: string }> = await axios.post(
        `${API_BASE_URL}auth/loginb`,
        {
          businessEmail,
          businessPassword,
        }
      );
      return response.data.token;
    } catch (error) {
      throw new Error(`Business login failed: ${error}`);
    }
  },

  getBusiness: async (token: string): Promise<Business> => {
    try {
      const response: AxiosResponse<Business> = await axios.get(
        `${API_BASE_URL}auth/business`, // Incomplete URL, replace with the correct path
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      return response.data;
    } catch (error) {
      throw new Error(`Failed to get business: ${error}`);
    }
  },
  /* <--- Business services end ---> */
};
