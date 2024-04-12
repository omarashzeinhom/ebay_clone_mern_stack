import "./RegisterForm.scss";
import React, { useState } from "react";
import { User } from "../../../models/user";
import { Business } from "../../../models/business";
import { useAuth } from "../../../context/AuthContext";
import UserAccountForm from "./User/UserAccountForm";
import BusinessAccountForm from "./Business/BusinessAccountForm";
import { authService } from "../../../services/authService";
import NotificationCard from "../../../components/NotifcationCard/NotificationCard";

const RegisterForm: React.FC = () => {
  const { token } = useAuth();
  const [accountType, setAccountType] = useState<string>("Personal account");
  const [notification, setNotification] = useState<string | null>(null);
  //
  console.log("notification===>" + notification);

  const [user, setUser] = useState<User>({
    userId: "",
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    avatar: "",
  });

  const [business, setBusiness] = useState<Business>({
    businessName: "",
    businessEmail: "",
    businessPassword: "",
    businessLocation: "",
    businessActive: true || false,
  });

  const showNotification = (message: string) => {
    setNotification(message);
    // Clear the notification after a certain time
    setTimeout(() => {
      setNotification(null);
    }, 3000); // Adjust the duration as needed
  };


  const handleRegister = async () => {
    try {
      if (accountType === "Personal account") {
        await authService.register(
         user
        );
        showNotification("Registration successful! For User" + user?.firstName);
      } else if (accountType === "Business account") {
        if (
          business.businessName &&
          business.businessEmail &&
          business.businessPassword &&
          business.businessActive !== undefined
        ) {
          await authService.registerBusiness(
            business.businessName,
            business.businessEmail,
            business.businessPassword,
            business.businessLocation || "",
            business.businessActive || true,
            business.businessAvatar &&
              typeof business.businessAvatar !== "string"
              ? URL.createObjectURL(business.businessAvatar)
              : business.businessAvatar || ""
          );
        }
      }

      console.log("Registration was successful");
    } catch (error) {
      console.error(`Registration failed due to: ${error}`);
      alert(error);
      showNotification("Registration failed. Please try again.");
    }
  };

  const handleRoleChange = (selectedRole: string) => {
    setAccountType(selectedRole);
  };

  const RegisterNav = () => {
    return (
      <div className="app__register-nav">
        <div className="app__register-nav-left">
          <a href="/">
            <img
              src="/ebaylogo.png"
              alt="ebaylogo"
              width={140}
              height={57}
              loading="lazy"
            />
          </a>
        </div>
        <div className="app__register-nav-right">
          <a href="/survey">Tell us what you think</a>
        </div>
      </div>
    );
  };

  return (
    <>
      <RegisterNav />

      {token ? (
        <div className="app__signed-in">
          <h2>Already Signed In </h2>
          <p>
            Head back <a href="/">home</a>
          </p>
        </div>
      ) : (
        <div className="app__registration-container">
          <h2>Create an account </h2>
          <div className="app__registration-radioBtns">
            <label>
              <input
                type="radio"
                name="accountType"
                checked={accountType === "Personal account"}
                value="Personal account"
                onChange={() => handleRoleChange("Personal account")}
              />
              Personal account
            </label>
            <label>
              <input
                type="radio"
                name="accountType"
                checked={accountType === "Business account"}
                value="Business account"
                onChange={() => handleRoleChange("Business account")}
              />
              Business account
            </label>
          </div>
        {notification && <NotificationCard type="success" message={notification} />}
        
          {accountType === "Personal account" && (
            <UserAccountForm
              user={user}
              handleRegister={handleRegister}
              setUser={setUser}
            />
          )}

          {accountType === "Business account" && (
            <BusinessAccountForm
              business={business}
              handleRegister={handleRegister}
              setBusiness={setBusiness}
            />
          )}
        </div>
      )}
    </>
  );
};

export default RegisterForm;
