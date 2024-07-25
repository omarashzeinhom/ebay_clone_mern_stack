import axios from "axios";
import { User } from "../models/user";
import { createContext, useContext, useEffect, useState } from "react";
import { API_BASE_URL } from "../utilities/constants";
import { UpdatedUser } from "../models";

interface UserAuthContextType {
  userToken: string | null;
  user: User | null;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
  login: (userToken: string, user: User) => void;
  logout: () => void;
  updateUser: (
    selectedAvatar: File | undefined,
    updatedUser: UpdatedUser | undefined
  ) => Promise<void>;
  updatedUser: UpdatedUser | undefined;
  setUpdatedUser: React.Dispatch<React.SetStateAction<UpdatedUser | undefined>>;
  fetchUserInformation: (userToken: string) => Promise<void>;
}

const UserAuthContext = createContext<UserAuthContextType | undefined>(undefined);

export const UserAuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [userToken, setUserToken] = useState<string | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [updatedUser, setUpdatedUser] = useState<UpdatedUser | undefined>(undefined);

  useEffect(() => {
    const userStoredToken = localStorage.getItem("user-token");
    if (userStoredToken) {
      setUserToken(userStoredToken);
      fetchUserInformation(userStoredToken);
      const logoutTimeout = setTimeout(() => {
        logout();
        showLogoutNotification();
      }, 3600 * 1000); // 1 hour in milliseconds
      return () => clearTimeout(logoutTimeout);
    }
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

  const fetchUserInformation = async (userToken: string) => {
    try {
      const response = await axios.get(`${API_BASE_URL}auth/user`, {
        headers: { Authorization: `Bearer ${userToken}` },
      });
      setUser(response.data);
    } catch (error) {
      console.error("Error fetching user information:", error);
    }
  };

  const login = (newToken: string, newUser: User) => {
    setUserToken(newToken);
    setUser(newUser);
    localStorage.setItem("user-token", newToken);
    localStorage.setItem("user", JSON.stringify(newUser));
  };

  const logout = () => {
    setUserToken(null);
    setUser(null);
    localStorage.removeItem("user-token");
    localStorage.removeItem("user");
  };

  const updateUser = async (
    selectedAvatar: File | undefined,
    updatedUser: UpdatedUser | undefined
  ) => {
    const formData = new FormData();
    if (user?.userId) {
      formData.append("_id", user.userId);
    }
    if (user?.password) {
      formData.append("password", updatedUser?.password || user.password);
    }
    if (updatedUser?.email) {
      formData.append("email", updatedUser.email);
    }
    if (updatedUser?.firstName) {
      formData.append("firstName", updatedUser.firstName);
    }
    if (updatedUser?.lastName) {
      formData.append("lastName", updatedUser.lastName);
    }
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
            Authorization: `Bearer ${userToken}`,
          },
        }
      );

      const updatedUserData: UpdatedUser = {
        _id: user?.userId || "", // Ensure _id is set
        firstName: updatedUser?.firstName || user?.firstName || "",
        lastName: updatedUser?.lastName || user?.lastName || "",
        email: updatedUser?.email || user?.email || "",
        avatar: updatedUser?.avatar || user?.avatar || "",
        password: updatedUser?.password || user?.password || "",
      };

      setUpdatedUser(updatedUserData);
      setUser({
        ...user!,
        ...updatedUserData,
      });

      console.log(response.data);
    } catch (error) {
      console.error("Error updating user:", error);
    }
  };

  const contextValue: UserAuthContextType = {
    userToken,
    user,
    login,
    logout,
    updateUser,
    updatedUser,
    fetchUserInformation,
    setUser,
    setUpdatedUser,
  };

  return (
    <UserAuthContext.Provider value={contextValue}>
      {children}
    </UserAuthContext.Provider>
  );
};

export const useUserAuth = () => {
  const context = useContext(UserAuthContext);
  if (!context) {
    throw new Error("useUserAuth must be used within a UserAuthProvider");
  }
  return context;
};
