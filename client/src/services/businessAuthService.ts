import axios, { AxiosResponse } from "axios";
import { Business } from "../models";
import { API_BASE_URL } from "../utilities/constants";

export const businessAuthService = {
  /* <--- Business services start ---> */

  registerBusiness: async (business: Business): Promise<void> => {
    try {
      const response = await axios.post(
        `${API_BASE_URL}auth/registerb`,
        business
      );
      console.log("Business registration response:", response.data);
      return response?.data;
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
      const response: AxiosResponse<{ businessToken: string }> =
        await axios.post(`${API_BASE_URL}auth/loginb`, {
          businessEmail,
          businessPassword,
        });
      return response.data.businessToken;
    } catch (error) {
      throw new Error(`Business login failed: ${error}`);
    }
  },

  getBusiness: async (businessToken: string): Promise<Business> => {
    try {
      const response: AxiosResponse<Business> = await axios.get(
        `${API_BASE_URL}auth/business`, // Incomplete URL, replace with the correct path
        {
          headers: { Authorization: `Bearer ${businessToken}` },
        }
      );
      console.log("Business data from server:", response?.data); // Add this line

      return {
        businessId: response?.data?.businessId || "",
        businessEmail: response?.data?.businessEmail || "",
        businessPassword: response?.data.businessPassword || "",
        businessName: response?.data?.businessName || "",
        businessAvatar: response?.data?.businessAvatar || "",
        businessActive: response?.data.businessActive || true || false || null,
        businessLocation: response?.data.businessLocation || "",
        businessCountry: response?.data.businessCountry || "",
        businessProducts: response?.data.businessProducts || [],
      };
    } catch (error) {
      throw new Error(`Failed to get business: ${error}`);
    }
  },
  /* <--- Business services end ---> */
};
