import axios from "axios";

const API_BASE_URL = "http://localhost:3001/auth";

export const authService = {
  register: async (username: string, password: string): Promise<void> => {
    await axios.post(`${API_BASE_URL}/register`, { username, password });
  },
  login: async (username: string, password: string): Promise<string> => {
    const response = await axios.post(`${API_BASE_URL}/login`, {
      username,
      password,
    });
    return response.data.token;
  },
};
