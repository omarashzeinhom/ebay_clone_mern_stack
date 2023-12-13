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
        placeholder="Business Name"
        value={businessName}
        onChange={(e) =>
          setBusiness({ ...business, businessName: e.target.value })
        }
        className="app__baform-input"
      />
      <input
        type="email"
        placeholder="Business Email"
        value={businessEmail}
        onChange={(e) =>
          setBusiness({ ...business, businessEmail: e.target.value })
        }
        className="app__baform-input"
      />
      <input
        type="password"
        placeholder="Business Password"
        value={businessPassword}
        onChange={(e) =>
          setBusiness({ ...business, businessPassword: e.target.value })
        }
        className="app__baform-input"
      />
      <select
        value={businessLocation}
        onChange={(e) =>
          setBusiness({ ...business, businessLocation: e.target.value })
        }
        className="app__baform-input"
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
