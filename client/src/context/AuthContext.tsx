import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
import { User } from "../models/user";
import { Business } from "../models/business";

interface AuthContextType {
  token: string | null;
  user: User | null;
  business: Business | null;
  loginBusiness: (token: string, data: Business) => void;
  logoutBusiness: () => void;
  login: (token: string, data: User) => void;
  logout: () => void;
  updateUser: (newToken: string, updUser: User) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [token, setToken] = useState<string | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [business, setBusiness] = useState<Business | null>(null);
  const [updatedUser, setUpdatedUser] = useState<User>();

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

  const updateUser = (newToken: string, updUser: User) => {
  if(newToken){
    setUpdatedUser(updatedUser);
    setUser(updUser);
    setToken(newToken);
    // Updating the new user logged info 
    localStorage.setItem("token", newToken);
    localStorage.setItem("user", JSON.stringify(updUser));
  }

  };

  return (
    <AuthContext.Provider
      value={{
        token,
        user,
        login,
        logout,
        business,
        loginBusiness,
        logoutBusiness,
        updateUser,
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
