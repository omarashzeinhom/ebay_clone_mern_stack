import axios from "axios";
import { User } from "../models/user";
import { Business } from "../models/business";
import { createContext, useContext, useEffect, useState } from "react";
import { API_BASE_URL } from "../utilities/constants";
import { UpdatedUser, UpdatedBusiness } from "../models";

interface AuthContextType {
  token: string | null;
  user: User | null;
  setUser: React.Dispatch<React.SetStateAction<User | any>>;
  setBusiness: React.Dispatch<React.SetStateAction<Business | any>>;
  business: Business | null;
  loginBusiness: (token: string, data: Business) => void;
  logoutBusiness: () => void;
  login: (token: string, data: User) => void;
  logout: () => void;
  updateUser: (
    selectedAvatar: File | undefined,
    updatedUser: UpdatedUser | undefined
  ) => Promise<void>;
  updateBusiness: (
    selectedAvatar: File | undefined,
    updatedUser: UpdatedBusiness | undefined
  ) => Promise<void>;
  updatedUser: UpdatedUser | undefined;
  updatedBusiness: UpdatedBusiness | undefined;
  setUpdatedBusiness: React.Dispatch<
    React.SetStateAction<UpdatedBusiness | undefined>
  >;
  setUpdatedUser: React.Dispatch<React.SetStateAction<UpdatedUser | undefined>>;
  fetchUserInformation: (token: string) => Promise<void>;
  fetchBusinessInformation: (token: string) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [token, setToken] = useState<string | null>(null);
  //user
  const [user, setUser] = useState<User | null>(null);
  const [updatedUser, setUpdatedUser] = useState<UpdatedUser>({
    _id: `${user?.userId}`,
  }); //business
  const [business, setBusiness] = useState<Business | null>(null);
  const [updatedBusiness, setUpdatedBusiness] = useState<UpdatedBusiness>({});

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    if (storedToken) {
      setToken(storedToken);
      fetchUserInformation(storedToken);
      fetchBusinessInformation(storedToken);

      // Set automatic logout after 1 hour (3600 seconds)
      const logoutTimeout = setTimeout(() => {
        logout();
        showLogoutNotification();
      }, 3600 * 1000); // 1 hour in milliseconds

      // Clear the timeout on component unmount or when the user logs out manually
      return () => clearTimeout(logoutTimeout);
    }
    // eslint-disable-next-line
  }, []);

  const showLogoutNotification = () => {
    if (Notification.permission === "granted") {
      alert(
        "You Have Been Logged Out Within 1 Hour Limit for your information safety"
      );
      new Notification("Auto Logout", {
        body: "You have been logged out due to inactivity.",
        icon: "/client/public/avataaars.png", // Replace with the path to your notification icon
      });
    } else if (Notification.permission !== "denied") {
      Notification.requestPermission().then((permission) => {
        if (permission === "granted") {
          new Notification("Auto Logout", {
            body: "You have been logged out due to inactivity.",
            icon: "/client/public/avatars.png", // Replace with the path to your notification icon
          });
        }
      });
    }
  };

  const fetchUserInformation = async (token: string) => {
    if (!business && !user) {
      // Check if neither business nor user is logged in
      try {
        const response = await axios.get(`${API_BASE_URL}auth/user`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUser(response.data);
      } catch (error) {
        console.error("Error fetching user information:", error);
      }
    } else {
      console.warn(`A business or user is already logged in`);
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

  const updateUser = async (
    selectedAvatar: File | undefined,
    updatedUser: UpdatedUser | undefined
  ) => {
    const formData = new FormData();
    if (user?.userId) {
      formData.append("_id", user?.userId);
    }
    if (user?.password) {
      formData.append(
        "password",
        updatedUser?.password || user?.password
      );
    }
    if (updatedUser?.email) {
      formData.append("email", updatedUser?.email);
    }
    if (updatedUser?.firstName) {
      formData.append("firstName", updatedUser?.firstName);
    }
    if (updatedUser?.lastName) {
      formData.append("lastName", updatedUser?.lastName);
    }
    if (selectedAvatar) {
      formData.append("updatedAvatar", selectedAvatar);
    }

    try {
      const response = await axios.put(
        `${API_BASE_URL}auth/user/:${user?.userId}`,
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
        firstName: updatedUser?.firstName || prevUser?.firstName,
        lastName: updatedUser?.lastName || prevUser?.lastName,
        email: updatedUser?.email || prevUser?.email,
        avatar: updatedUser?.avatar || prevUser?.avatar,
      }));

      setUser((prevUser) => ({
        ...prevUser!,
        firstName: updatedUser?.firstName  || prevUser?.firstName || "",
        lastName: updatedUser?.lastName || prevUser?.lastName || "",
        email: updatedUser?.email || prevUser?.email || "",
        avatar: updatedUser?.avatar  || prevUser?.avatar || "",
      }));

      console.log(response?.data);
    } catch (error) {
      console.error("Error updating user:", error);
    }
  };

  /** Business Logic  Start*/

  const fetchBusinessInformation = async (token: string) => {
    if (!business && !user) {
      // Check if neither business nor user is logged in
      try {
        const response = await axios.get(`${API_BASE_URL}auth/business`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setBusiness(response.data);
      } catch (error) {
        console.error("Error fetching business information:", error);
      }
    } else {
      console.warn(`A business or user is already logged in`);
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

  const updateBusiness = async (
    selectedAvatar: File | undefined,
    updatedBusiness: UpdatedBusiness | undefined
  ) => {
    const formData = new FormData();
    if (updatedBusiness?.updatedBusinessName)
      formData.append("businessName", updatedBusiness?.updatedBusinessName);
    if (updatedBusiness?.updatedBusinessEmail)
      formData.append("email", updatedBusiness?.updatedBusinessEmail);
    if (selectedAvatar) {
      formData.append("updatedAvatar", selectedAvatar);
    }

    try {
      const response = await axios.put(
        `${API_BASE_URL}auth/business/:${business?.businessId}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setUpdatedBusiness((prevBusiness) => ({
        ...prevBusiness,
        businessName:
          updatedBusiness?.updatedBusinessName ||
          updatedBusiness?.updatedBusinessName,
        businessEmail:
          updatedBusiness?.updatedBusinessEmail ||
          updatedBusiness?.updatedBusinessEmail,
        businessAvatar:
          updatedBusiness?.updatedBusinessAvatar ||
          updatedBusiness?.updatedBusinessAvatar,
      }));

      console.log(response?.data);
    } catch (error) {
      console.error("Error updating user:", error);
    }
  };
  /** Business Logic  End */

  const contextValue: AuthContextType = {
    token,
    user,
    business,
    login,
    logout,
    loginBusiness,
    logoutBusiness,
    updateUser,
    updateBusiness,
    updatedUser,
    updatedBusiness,
    fetchUserInformation,
    fetchBusinessInformation,
    setUser,
    setUpdatedBusiness: setUpdatedBusiness as React.Dispatch<
      React.SetStateAction<UpdatedBusiness | undefined>
    >,
    setUpdatedUser: setUpdatedUser as React.Dispatch<
      React.SetStateAction<UpdatedUser | undefined>
    >,
    setBusiness: setUpdatedBusiness as React.Dispatch<
      React.SetStateAction<UpdatedBusiness | undefined>
    >,
  };

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used with an AuthProvider");
  }
  return context;
};
