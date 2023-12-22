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
  const { businessName, businessEmail, businessPassword, businessLocation, businessAvatar } =
    business;

  return (
    <form className="app__baform" onClick={handleRegister}>
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
        autoComplete="email"
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
        autoComplete="current-password"
        onChange={(e) =>
          setBusiness({ ...business, businessPassword: e.target.value })
        }
      />
        <input
        type="text"
        id="businessAvatar"
        value={businessAvatar}
        placeholder="Business Avatar"
        className="app__baform-input"
        hidden
        onChange={(e) =>
          setBusiness({ ...business, businessAvatar: e.target.value })
        }
      />
      <select
        id="businessLocation"
        value={businessLocation }
        className="app__baform-input"
        onChange={(e) =>
          setBusiness({ ...business, businessLocation: e.target.value })
        }
      >
        <option>Egypt</option>
      </select>

      <button className="app__baform-Btn">
        Register
      </button>
    </form>
  );
};

export default BusinessAccountForm;