import axios, { AxiosResponse } from "axios";
import {  User, UpdatedUser } from "../models";
import { API_BASE_URL } from "../utilities/constants";

export const userAuthService = {
  /* <--- User services start ---> */
  register: async (user: {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    avatar?: any;
  }) => {
    try {
      const response = await axios.post(`${API_BASE_URL}auth/register`, user);
      return response?.data;
    } catch (error) {
      console.error(
        "Error in register, in authService.ts:" + { error }
      );
      throw error; // Re-throw the error to let the calling code handle it
    }
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

  updateUser: async (updatedUser: UpdatedUser | undefined, _id: string, token: string) => {
    const formData = new FormData();

    // Append all fields to formData
    if (updatedUser) {
        Object.entries(updatedUser).forEach(([key, value]) => {
            if (value) {
                formData.append(key, value);
            }
        });
    }

    try {
        const response = await axios.put(
            `${API_BASE_URL}auth/user/${_id}`,
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
        console.error("Failed to update user", error);
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

};
