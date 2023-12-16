import "./RegisterForm.scss";
import React, { useState } from "react";
import RegisterNav from "./RegisterNav";
import { User } from "../../../models/user";
import { Business } from "../../../models/business";
import { useAuth } from "../../../context/AuthContext";
import PersonalAccountForm from "./PersonalAccountForm";
import BusinessAccountForm from "./BusinessAccountForm";
import { authService } from "../../../services/authService";

const RegisterForm: React.FC = () => {
  const { token } = useAuth();
  const [accountType, setAccountType] = useState<string>("Personal account");
  const [user, setUser] = useState<User>({
    firstName: "",
    lastName: "",
    email: "",
    avatar: "",
    password: "",
  });

  const [business, setBusiness] = useState<Business>({
    businessName: "",
    businessEmail: "",
    businessPassword: "",
    businessLocation: "",
    businessActive: true || false,
  });

  const { firstName, lastName, email, password } = user;
  const {
    businessName,
    businessEmail,
    businessPassword,
    businessLocation,
    businessActive,
  } = business;

  //DEBUG User
  // console.log(firstName, lastName,email,password);

  // Debug Business

  // console.log(businessName, businessEmail, businessPassword, businessLocation )

  const handleRegister = async () => {
    console.log(accountType);
    try {
      if (accountType === "Personal account") {
        console.log(email, user.password);
        await authService.register(firstName, lastName, email, password);
      } else if (accountType === "Business account") {
        console.log(businessEmail, businessPassword);
        // Implement the registration logic for the business account
        if (
          businessName &&
          businessEmail &&
          businessPassword &&
          businessActive !== undefined
        ) {
          await authService.registerBusiness(
            businessName,
            businessEmail,
            businessPassword,
            businessLocation || "",
            businessActive
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
            <PersonalAccountForm
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
