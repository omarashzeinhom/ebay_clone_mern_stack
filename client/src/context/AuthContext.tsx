import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
import { User } from "../models/user";
import { Business } from "../models/business";

interface AuthContextType {
  token: string | null;
  user: User | null;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
  business: Business | null;
  loginBusiness: (token: string, data: Business) => void;
  logoutBusiness: () => void;
  login: (token: string, data: User) => void;
  logout: () => void;
  updateUser: (selectedAvatar: File | undefined) => Promise<void>;
  updatedUser: User | undefined; // New state variable
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [token, setToken] = useState<string | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [business, setBusiness] = useState<Business | null>(null);
  const [updatedUser, setUpdatedUser] = useState<User | undefined>(undefined);

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    if (storedToken) {
      setToken(storedToken);
      // Fetch user information from the server using the stored token
      fetchUserInformation(storedToken);
      fetchBusinessInformation(storedToken);
    }
  }, []);

  const fetchUserInformation = async (token: string) => {
    try {
      const response = await axios.get("http://localhost:3001/auth/user", {
        headers: { Authorization: `Bearer ${token}` },
      });
      console.log(
        `fetchUserInformation ======> ${JSON.stringify(response?.data)}`
      );
      setUser(response.data);
      setUpdatedUser(response.data); // Update updatedUser when user information changes
    } catch (error) {
      console.error("Error fetching user information:", error);
      // Handle error (e.g., log out the user)
    }
  };

  const login = (newToken: string, newUser: User) => {
    setToken(newToken);
    setUser(newUser);
    localStorage.setItem("token", newToken);
    // Set the user information
    console.log(newUser);
    localStorage.setItem("user", JSON.stringify(newUser));
  };

  const logout = () => {
    setToken(null);
    setUser(null);
    localStorage.removeItem("token");
  };

  const fetchBusinessInformation = async (token: string) => {
    try {
      const response = await axios.get("http://localhost:3001/auth/business", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setBusiness(response.data);
    } catch (error) {
      console.error("Error fetching user information:", error);
    }
  };

  const loginBusiness = (newToken: string, newBusiness: Business) => {
    setToken(newToken);
    setBusiness(newBusiness);
    localStorage.setItem("token", newToken);
    // Set the user information
    localStorage.setItem("business", JSON.stringify(newBusiness));
  };

  const logoutBusiness = () => {
    setToken(null);
    setBusiness(null);
    localStorage.removeItem("token");
  };

  const updateUser = async (selectedAvatar: File | undefined) => {
    const formData = new FormData();
    if (user?.firstName) formData.append("firstName", user?.firstName);
    if (user?.lastName) formData.append("lastName", user?.lastName);
    if (user?.email) formData.append("email", user?.email);

    console.log(formData);
    // Append the selectedAvatar if it exists
    if (selectedAvatar) {
      formData.append("avatar", selectedAvatar);
    }

    try {
      const response = await axios.put(
        `http://localhost:3001/auth/user/${user?.userId}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`, // Include the authorization header if needed
          },
        }
      );

      // Handle the response as needed
      console.log(response.data);
    } catch (error) {
      console.error("Error updating user:", error);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        token,
        user,
        updatedUser,
        login,
        logout,
        business,
        loginBusiness,
        logoutBusiness,
        updateUser,
        setUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used with an AuthProvider");
  }
  return context;
};
