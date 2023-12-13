import "./RegisterForm.scss";
import React, { useState } from "react";
import PersonalAccountForm from "./PersonalAccountForm";
import BusinessAccountForm from "./BusinessAccountForm"; // Fix typo in import
import RegisterNav from "./RegisterNav";
import { User } from "../../../models/user";
import { Business } from "../../../models/business";
import { authService } from "../../../services/authService";

const RegisterForm: React.FC = () => {
  const [accountType, setAccountType] = useState<string>("");
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
  const { businessName, businessEmail, businessPassword, businessLocation } =
    business;

  //DEBUG User
  // console.log(firstName, lastName,email,password);

  // Debug Business

  // console.log(businessName, businessEmail, businessPassword, businessLocation )

  const handleRegister = async () => {
    try {
      if (accountType === "Personal account") {
        console.log(email, user.password);
        await authService.register(email, user.password);
      } else if (accountType === "Business account") {
        console.log(businessEmail, businessPassword);
        // Implement the registration logic for the business account
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
      <div className="app__registration-container">
        <h2>Create an account </h2>
        <div className="app__registration-radioBtns">
          <label>
            <input
              type="radio"
              name="accountType"
              value="Personal account"
              onChange={() => handleRoleChange("Personal account")}
            />
            Personal account
          </label>
          <label>
            <input
              type="radio"
              name="accountType"
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
    </>
  );
};

export default RegisterForm;
