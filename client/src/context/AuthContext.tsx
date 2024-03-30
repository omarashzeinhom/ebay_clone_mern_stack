import axios from "axios";
import { User } from "../models/user";
import { Business } from "../models/business";
import { createContext, useContext, useEffect, useState } from "react";
import { API_BASE_URL } from "../utilities/constants";

interface AuthContextType {
  token: string | null ;
  user: User | null;
  setUser: React.Dispatch<React.SetStateAction<User | any>>;
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


export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [token, setToken] = useState<string | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [business, setBusiness] = useState<Business | null>(null);
  const [updatedUser, setUpdatedUser] = useState<UpdatedUser>({});

  useEffect(() => {
    const storedToken = localStorage.getItem('token');
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
  },[]);

  const showLogoutNotification = () => {
    if (Notification.permission === 'granted') {
      alert('You Have Been Logged Out Within 1 Hour Limit for your information safety')
      new Notification('Auto Logout', {
        body: 'You have been logged out due to inactivity.',
        icon: '/client/public/avataaars.png', // Replace with the path to your notification icon
      });
    } else if (Notification.permission !== 'denied') {
      Notification.requestPermission().then((permission) => {
        if (permission === 'granted') {
          new Notification('Auto Logout', {
            body: 'You have been logged out due to inactivity.',
            icon: '/client/public/avatars.png', // Replace with the path to your notification icon
          });
        }
      });
    }
  };


  const fetchUserInformation = async (token: string) => {
    if(!business){
      try {
        const response = await axios.get(`${API_BASE_URL}auth/user`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUser(response.data);
        //setUpdatedUser(response.data);
      } catch (error) {
        console.error("Error fetching user information:", error);
      }
    }else{
      console.warn(`No Business or User Logged In`);

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

  /** Business Logic  Start*/
  const fetchBusinessInformation = async (token: string) => {
    if(!user){
      try {
        const response = await axios.get(`${API_BASE_URL}auth/business`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setBusiness(response.data);
      } catch (error) {
        console.error("Error fetching user information:", error);
      }
    }else{
      console.warn(`No Business or User Logged In`);

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
  /** Business Logic  End */

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
