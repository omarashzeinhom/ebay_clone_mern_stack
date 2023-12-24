import axios, { AxiosResponse } from "axios";
import { User } from "../models/user";
import { Business } from "../models/business";

const API_BASE_URL = "https://server-ebay-clone.onrender.com/auth";

export const authService = {
  /* <--- User services start ---> */
  register: async (
    firstName: string,
    lastName: string,
    email: string,
    password: string,
    avatar?: string
  ): Promise<void> => {
    await axios.post(`${API_BASE_URL}/register`, {
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
        `${API_BASE_URL}/login`,
        {
          email,
          password,
        }
      );
      console.log(response.data.token);

      return response.data.token;
    } catch (error) {
      throw new Error(`Login failed: ${error}`);
    }
  },



updateUser: async(token: string, firstName: string , lastName:string, email:string, password: string, avatar: string): Promise<User>=>{
  try{
    const response: AxiosResponse<User>= await axios.patch(
      `https://server-ebay-clone.onrender.com/auth/user`,
    {
      header: {Authorization: `Bearer ${token}`},
      user: {
          firstName,
          lastName,
          email,
          password,
          avatar: avatar || "",
      }
    },
    
      )
      return response?.data;
  }catch(error){
    throw new Error(`Failed to get user: ${error}`);

  }
},



getUser: async (token: string): Promise<User> => {
  try {
    const response: AxiosResponse<User> = await axios.get(
      `${API_BASE_URL}/user`,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    console.log('User data from server:', response?.data); // Add this line

    return {
      userId: response?.data?.userId || '',
      email: response?.data?.email || '',
      password: response?.data.password || '',
      firstName: response?.data?.firstName || '',
      lastName: response?.data?.lastName || '',
      avatar: response?.data?.avatar || '',
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
      const response = await axios.post(`${API_BASE_URL}/registerb`, {
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
        `${API_BASE_URL}/loginb`,
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
        `${API_BASE_URL}/business`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      console.log(response?.data);

      return response?.data;
    } catch (error) {
      throw new Error(`Failed to get business: ${error}`);
    }
  },
  /* <--- Business services end ---> */
};
