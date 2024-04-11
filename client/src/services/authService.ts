import axios, { AxiosResponse } from "axios";
import { User, UpdatedUser, Business } from "../models";
import { API_BASE_URL } from "../utilities/constants";
import { useAuth } from "../context/AuthContext";

export const authService = {
  /* <--- User services start ---> */
  register: async (
    firstName: string,
    lastName: string,
    email: string,
    password: string,
    avatar?: string
  ): Promise<void> => {
    await axios.post(`${API_BASE_URL}auth/register`, {
      firstName,
      lastName,
      email,
      password,
      avatar: avatar || "",
    });
  },

  login: async (email: string, password: string): Promise<string> => {
    try {
      const response: AxiosResponse<{ token: string }> = await axios.post(
        `${API_BASE_URL}auth/login`,
        {
          email,
          password,
        }
      );
      console.log(`JSON Web Token (JWT) :${response.data.token}`);

      return response.data.token;
    } catch (error) {
      throw new Error(`Login failed: ${error}`);
    }
  },

  updateUser: async (
    updatedUser: UpdatedUser | undefined,
    userId: string,
    token: string
  ) => {
    const formData = new FormData();
    formData.append("updatedFirstName", updatedUser?.updatedFirstName || "");
    formData.append("updatedLastName", updatedUser?.updatedLastName || "");
    formData.append("updatedEmail", updatedUser?.updatedEmail || "");

    try {
      const response = await axios.put(
        `${API_BASE_URL}auth/user/${userId}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log(response?.data);
      return response?.data;
    } catch (error) {
      throw new Error(`Failed to update user: ${error}`);
    }
  },

  getUser: async (token: string): Promise<User> => {
    try {
      const response: AxiosResponse<User> = await axios.get(
        `${API_BASE_URL}auth/user`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      console.log("User data from server:", response?.data); // Add this line

      return {
        userId: response?.data?.userId || "",
        email: response?.data?.email || "",
        password: response?.data.password || "",
        firstName: response?.data?.firstName || "",
        lastName: response?.data?.lastName || "",
        avatar: response?.data?.avatar || "",
      };
    } catch (error) {
      throw new Error(`Failed to get user: ${error}`);
    }
  },

  /* <---User services end ---> */

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
