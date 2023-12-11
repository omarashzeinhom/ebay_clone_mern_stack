import axios from "axios";

const API_BASE_URL = "http://localhost:3001/auth";

export const authService = {
  register: async (email: string, password: string): Promise<void> => {
    await axios.post(`${API_BASE_URL}/register`, { email, password });
  },
  login: async (email: string, password: string): Promise<string> => {
    const response = await axios.post(`${API_BASE_URL}/login`, {
      email,
      password,
    });
    return response.data.token;
  },
  getUser: async (token: string): Promise<any> => {
    const response = await axios.get(`${API_BASE_URL}/user`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  },
};
