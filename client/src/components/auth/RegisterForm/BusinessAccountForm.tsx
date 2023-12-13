// BusinessAccountForm.tsx
import React from "react";
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
  const { businessName, businessEmail, businessPassword, businessLocation } =
    business;

  return (
    <>
      <h2>Register</h2>
      <input
        type="text"
        placeholder="Business Name"
        value={businessName}
        onChange={(e) =>
          setBusiness({ ...business, businessName: e.target.value })
        }
        className="app__register-input"
      />
      <input
        type="email"
        placeholder="Business Email"
        value={businessEmail}
        onChange={(e) =>
          setBusiness({ ...business, businessEmail: e.target.value })
        }
        className="app__register-input"
      />
      <input
        type="password"
        placeholder="Business Password"
        value={businessPassword}
        onChange={(e) =>
          setBusiness({ ...business, businessPassword: e.target.value })
        }
        className="app__register-input"
      />
      <select
        value={businessLocation}
        onChange={(e) =>
          setBusiness({ ...business, businessLocation: e.target.value })
        }
        className="app__register-input"
      >
        <option>Egypt</option>
      </select>

      <button onClick={handleRegister} className="app__register-Btn">
        Register
      </button>
    </>
  );
};

export default BusinessAccountForm;
