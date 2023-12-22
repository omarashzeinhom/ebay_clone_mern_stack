// BusinessAccountForm.tsx
import React, { useState } from "react";
import { Business } from "../../../models/business";
import "./styles/BusinessAccountForm.scss";

interface BusinessAccountFormProps {
  business: Business;
  handleRegister: () => void;
  setBusiness: React.Dispatch<React.SetStateAction<Business>>;
}

const BusinessAccountForm: React.FC<BusinessAccountFormProps> = ({
  business,
  handleRegister,
  setBusiness,
}) => {

    const [localBusiness, setLocalBusiness] = useState<Business>(business);

    const handleChange = (field: string, value: string) => {
      const updatedBusiness: Business = {
        ...localBusiness,
        [field]: value, // Update the specific field in the updatedUser
      };
      setLocalBusiness( updatedBusiness);
      setBusiness( updatedBusiness);
    };
    const { businessName, businessEmail, businessPassword, businessLocation } = localBusiness;
  return (
    <div className="app__baform">
      <form>
      <input
        type="text"
        id="businessName"
        value={businessName}
        placeholder="Business Name"
        className="app__baform-input"
        onChange={(e) => handleChange("businessName", e.target.value)}
      />
      <input
        type="email"
        id="businessEmail"
        value={businessEmail}
        autoComplete="email"
        placeholder="Business Email"
        className="app__baform-input"
        onChange={(e) => handleChange("businessEmail", e.target.value)}

      />
      <input
        type="password"
        id="businessPassword"
        value={businessPassword}
        placeholder="Business Password"
        className="app__baform-input"
        autoComplete="current-password"
        onChange={(e) => handleChange("businessPassword", e.target.value)}

      />
      <select
        id="businessLocation"
        value={businessLocation }
        className="app__baform-input"
        onChange={(e) => handleChange("businessLocation", e.target.value)}

      >
        <option>Egypt</option>
      </select>

      <button className="app__baform-Btn" onClick={handleRegister}>
        Register
      </button>
      </form>
      
      <small>
        <p>Already have an account?</p> <a href="/signin">SignIn!</a>
      </small>
    </div>
  );
};

export default BusinessAccountForm;
