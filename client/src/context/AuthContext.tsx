import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
import { User } from "../models/user";
import { Business } from "../models/business";

interface AuthContextType {
  token: string | null ;
  user: User | null;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
  business: Business | null;
  loginBusiness: (token: string, data: Business) => void;
  logoutBusiness: () => void;
  login: (token: string, data: User) => void;
  logout: () => void;
  updateUser: (
    selectedAvatar: File | undefined,
    updatedUser: UpdatedUser | undefined
  ) => Promise<void>;
  updatedUser: UpdatedUser | undefined;
  setUpdatedUser: React.Dispatch<React.SetStateAction<UpdatedUser | undefined>>;
  fetchUserInformation: (token: string) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const API_BASE_URL = "https://server-ebay-clone.onrender.com/";

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [token, setToken] = useState<string | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [business, setBusiness] = useState<Business | null>(null);
  const [updatedUser, setUpdatedUser] = useState<UpdatedUser>({});

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    if (storedToken) {
      setToken(storedToken);
      fetchUserInformation(storedToken);
      fetchBusinessInformation(storedToken);
    }
  }, []);

  const fetchUserInformation = async (token: string) => {
    try {
      const response = await axios.get(`${API_BASE_URL}auth/user`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setUser(response.data);
      //setUpdatedUser(response.data);
    } catch (error) {
      console.error("Error fetching user information:", error);
    }
  };

  const login = (newToken: string, newUser: User) => {
    setToken(newToken);
    setUser(newUser);
    localStorage.setItem("token", newToken);
    localStorage.setItem("user", JSON.stringify(newUser));
  };

  const logout = () => {
    setToken(null);
    setUser(null);
    localStorage.removeItem("token");
  };

  const fetchBusinessInformation = async (token: string) => {
    try {
      const response = await axios.get(`${API_BASE_URL}auth/business`, {
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
    localStorage.setItem("business", JSON.stringify(newBusiness));
  };

  const logoutBusiness = () => {
    setToken(null);
    setBusiness(null);
    localStorage.removeItem("token");
  };

  const updateUser = async (
    selectedAvatar: File | undefined,
    updatedUser: UpdatedUser | undefined
  ) => {
    const formData = new FormData();
    if (updatedUser?.updatedFirstName)
      formData.append("firstName", updatedUser?.updatedFirstName);
    if (updatedUser?.updatedLastName)
      formData.append("lastName", updatedUser?.updatedLastName);
    if (updatedUser?.updatedEmail)
      formData.append("email", updatedUser?.updatedEmail);

    if (selectedAvatar) {
      formData.append("updatedAvatar", selectedAvatar);
    }


    try {
      const response = await axios.put(
        `${API_BASE_URL}auth/user/${user?.userId}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        }
      );
  
      setUpdatedUser((prevUser) => ({
        ...prevUser,
        firstName: updatedUser?.updatedFirstName || prevUser?.updatedFirstName,
        lastName: updatedUser?.updatedLastName || prevUser?.updatedLastName,
        email: updatedUser?.updatedEmail || prevUser?.updatedEmail,
        avatar: updatedUser?.updatedAvatar || prevUser?.updatedAvatar,
      }));
      
      setUser((prevUser) => ({
        ...prevUser!,
        firstName: updatedUser?.updatedFirstName || prevUser?.firstName || '',
        lastName: updatedUser?.updatedLastName || prevUser?.lastName || '',
        email: updatedUser?.updatedEmail || prevUser?.email || '',
        avatar: updatedUser?.updatedAvatar || prevUser?.avatar || '',
      }));

  
      console.log(response?.data);
    } catch (error) {
      console.error("Error updating user:", error);
    }
  };

  const contextValue: AuthContextType = {
    token,
    user,
    updatedUser,
    login,
    logout,
    business,
    loginBusiness,
    logoutBusiness,
    fetchUserInformation,
    updateUser,
    setUser,
    setUpdatedUser: setUpdatedUser as React.Dispatch<
      React.SetStateAction<UpdatedUser | undefined>
    >,
  };

  return (
    <AuthContext.Provider value={contextValue}>
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
