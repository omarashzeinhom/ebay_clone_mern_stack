import axios from "axios";
import { User } from "../models/user";
import { createContext, useContext, useEffect, useState } from "react";
import { API_BASE_URL } from "../utilities/constants";
import { UpdatedUser } from "../models";

interface UserAuthContextType {
  userToken: string | null;
  user: User | null;
  setUser: React.Dispatch<React.SetStateAction<User | any>>;
  login: (userToken: string, data: User) => void;
  logout: () => void;
  updateUser: (
    selectedAvatar: File | undefined,
    updatedUser: UpdatedUser | undefined
  ) => Promise<void>;
  updatedUser: UpdatedUser | undefined;
  setUpdatedUser: React.Dispatch<React.SetStateAction<UpdatedUser | undefined>>;
  fetchUserInformation: (userToken: string) => Promise<void>;
}

const UserAuthContext = createContext<UserAuthContextType | undefined>(
  undefined
);

export const UserAuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [userToken, setUserToken] = useState<string | null>(null);
  //user
  const [user, setUser] = useState<User | null>(null);
  const [updatedUser, setUpdatedUser] = useState<UpdatedUser>({
    _id: `${user?.userId}`,
  }); 

  useEffect(() => {
    const userStoredToken = localStorage.getItem("user-token");
    if (userStoredToken) {
      // Make sure to set user in token
      // Replace local storage 
      // Encrypted storage
      setUserToken(userStoredToken);
      fetchUserInformation(userStoredToken);

      // Set automatic logout after 1 hour (3600 seconds)
      const logoutTimeout = setTimeout(() => {
        logout();
        showLogoutNotification();
      }, 3600 * 1000); // 1 hour in milliseconds

      // Clear the timeout on component unmount or when the user logs out manually
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
    // Check if neither business nor user is logged in
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
      formData.append("_id", user?.userId);
    }
    if (user?.password) {
      formData.append("password", updatedUser?.password || user?.password);
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
            Authorization: `Bearer ${userToken}`,
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
        firstName: updatedUser?.firstName || prevUser?.firstName || "",
        lastName: updatedUser?.lastName || prevUser?.lastName || "",
        email: updatedUser?.email || prevUser?.email || "",
        avatar: updatedUser?.avatar || prevUser?.avatar || "",
      }));

      console.log(response?.data);
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
    setUpdatedUser: setUpdatedUser as React.Dispatch<
      React.SetStateAction<UpdatedUser | undefined>
    >,
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
    throw new Error("useAuth must be used with an AuthProvider");
  }
  return context;
};
