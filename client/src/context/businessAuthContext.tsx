import axios from "axios";
import { Business } from "../models/business";
import { createContext, useContext, useEffect, useState } from "react";
import { API_BASE_URL } from "../utilities/constants";
import { UpdatedBusiness } from "../models";

interface BusinessAuthContextType {
  businessToken: string | null;
  business: Business | null;
  setBusiness: React.Dispatch<React.SetStateAction<Business | any>>;
  loginBusiness: (businessToken: string, data: Business) => void;
  logoutBusiness: () => void;
  updateBusiness: (
    selectedAvatar: File | undefined,
    updatedUser: UpdatedBusiness | undefined
  ) => Promise<void>;
  updatedBusiness: UpdatedBusiness | undefined;
  setUpdatedBusiness: React.Dispatch<
    React.SetStateAction<UpdatedBusiness | undefined>
  >;
  fetchBusinessInformation: (businessToken: string) => Promise<void>;
}

const BusinessAuthContext = createContext<BusinessAuthContextType | undefined>(
  undefined
);

export const BusinessAuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [businessToken, setBusinessToken] = useState<string | null>(null);
  //user

  const [business, setBusiness] = useState<Business | null>(null);
  const [updatedBusiness, setUpdatedBusiness] = useState<UpdatedBusiness>({});

  useEffect(() => {
    const storedbusinessToken = localStorage.getItem("business-token");
    if (storedbusinessToken) {
      setBusinessToken(storedbusinessToken);
      fetchBusinessInformation(storedbusinessToken);
      // Set automatic logout after 1 hour (3600 seconds)
      const logoutTimeout = setTimeout(() => {
        logoutBusiness();
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

  /** Business Logic  Start*/

  const fetchBusinessInformation = async (businessToken: string) => {
    // Check if neither business nor user is logged in
    try {
      const response = await axios.get(`${API_BASE_URL}auth/business`, {
        headers: { Authorization: `Bearer ${businessToken}` },
      });
      setBusiness(response.data);
    } catch (error) {
      console.error("Error fetching business information:", error);
    }
  };

  const loginBusiness = (newbusinessToken: string, newBusiness: Business) => {
    setBusinessToken(newbusinessToken);
    setBusiness(newBusiness);
    localStorage.setItem("business-token", newbusinessToken);
    localStorage.setItem("business", JSON.stringify(newBusiness));
  };

  const logoutBusiness = () => {
    setBusinessToken(null);
    setBusiness(null);
    localStorage.removeItem("business-token");
    localStorage.removeItem("business");
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
            Authorization: `Bearer ${businessToken}`,
          },
        }
      );

      setUpdatedBusiness((prevBusiness: any) => ({
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

  const contextValue: BusinessAuthContextType = {
    businessToken,
    business,
    loginBusiness,
    logoutBusiness,
    updateBusiness,
    updatedBusiness,
    fetchBusinessInformation,
    setBusiness,
    setUpdatedBusiness: setUpdatedBusiness as React.Dispatch<
      React.SetStateAction<UpdatedBusiness | undefined>
    >,
  };

  return (
    <BusinessAuthContext.Provider value={contextValue}>
      {children}
    </BusinessAuthContext.Provider>
  );
};

export const useBusinessAuth = () => {
  const context = useContext(BusinessAuthContext);
  if (!context) {
    throw new Error(
      "useBusiness Auth must be used with an BusinessAuthProvider"
    );
  }
  return context;
};
