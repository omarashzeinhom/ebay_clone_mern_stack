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
    <div className="app__baform">
      <input
        type="text"
        id="businessName"
        value={businessName}
        placeholder="Business Name"
        className="app__baform-input"
        onChange={(e) =>
          setBusiness({ ...business, businessName: e.target.value })
        }
      />
      <input
        type="email"
        id="businessEmail"
        value={businessEmail}
        placeholder="Business Email"
        className="app__baform-input"
        onChange={(e) =>
          setBusiness({ ...business, businessEmail: e.target.value })
        }
      />
      <input
        type="password"
        id="businessPassword"
        value={businessPassword}
        placeholder="Business Password"
        className="app__baform-input"
        onChange={(e) =>
          setBusiness({ ...business, businessPassword: e.target.value })
        }
      />
      <select
        id="businessLocation"
        value={businessLocation}
        className="app__baform-input"
        onChange={(e) =>
          setBusiness({ ...business, businessLocation: e.target.value })
        }
      >
        <option>Egypt</option>
      </select>

      <button onClick={handleRegister} className="app__baform-Btn">
        Register
      </button>
    </div>
  );
};

export default BusinessAccountForm;