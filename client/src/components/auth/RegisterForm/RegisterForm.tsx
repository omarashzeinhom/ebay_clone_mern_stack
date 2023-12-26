import "./RegisterForm.scss";
import React, { useState } from "react";
import { User } from "../../../models/user";
import { Business } from "../../../models/business";
import { useAuth } from "../../../context/AuthContext";
import UserAccountForm from "./User/UserAccountForm";
import BusinessAccountForm from "./Business/BusinessAccountForm";
import { authService } from "../../../services/authService";

const RegisterForm: React.FC = () => {
  const { token } = useAuth();
  const [accountType, setAccountType] = useState<string>("Personal account");
  const [user, setUser] = useState<User>({
    userId: "",
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });

  const [business, setBusiness] = useState<Business>({
    businessName: "",
    businessEmail: "",
    businessPassword: "",
    businessLocation: "",
    businessActive: true || false,
  });

  const { firstName, lastName, email, password, avatar } = user;
  const {
    businessName,
    businessEmail,
    businessPassword,
    businessLocation,
    businessActive,
    businessAvatar,
  } = business;

  //DEBUG User
  // console.log(firstName, lastName,email,password);

  // Debug Business

  // console.log(businessName, businessEmail, businessPassword, businessLocation )

  const handleRegister = async () => {
    console.log(`accountType ---> ${accountType}`);
    try {
      if (accountType === "Personal account") {
        console.log(email, user.password);
        // Check if avatar is a File, convert it to a string (e.g., URL) before passing to register
        await authService.register(
          firstName,
          lastName,
          email,
          password,
          avatar && typeof avatar !== 'string' ? URL.createObjectURL(avatar) : avatar || ''
        );
      } else if (accountType === "Business account") {
        console.log(businessEmail, businessPassword);
        // Implement the registration logic for the business account
        if (
          businessName &&
          businessEmail &&
          businessPassword &&
          businessActive !== undefined
        ) {
          // Check if businessAvatar is a File, convert it to a string (e.g., URL) before passing to registerBusiness
          await authService.registerBusiness(
            businessName,
            businessEmail,
            businessPassword,
            businessLocation || "",
            businessActive || true,
            businessAvatar && typeof businessAvatar !== 'string'
              ? URL.createObjectURL(businessAvatar)
              : businessAvatar || ''
          );
        }
      }
  
      console.log("Registration was successful");
    } catch (error) {
      console.error(`Registration failed due to: ${error}`);
      alert(error);
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
            <img src="/ebaylogo.png" alt="ebaylogo" width={140} height={57} />
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
                checked={accountType === "Personal account"} // Check if accountType is "Personal account"
                value="Personal account"
                onChange={() => handleRoleChange("Personal account")}
              />
              Personal account
            </label>
            <label>
              <input
                type="radio"
                name="accountType"
                checked={accountType === "Business account"} // Check if accountType is "Business account"
                value="Business account"
                onChange={() => handleRoleChange("Business account")}
              />
              Business account
            </label>
          </div>

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
