import "./styles/PersonalAccountForm.scss";
import React, { useState } from "react";
import { User } from "../../../models/user";
import { FaGoogle, FaFacebook, FaApple } from "react-icons/fa";

interface PersonalAccountFormProps {
  user: {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
  };
  handleRegister: () => void;
  setUser: React.Dispatch<
    React.SetStateAction<{
      firstName: string;
      lastName: string;
      email: string;
      password: string;
    }>
  >;
}

const PersonalAccountForm: React.FC<PersonalAccountFormProps> = ({
  user,
  handleRegister,
  setUser,
}) => {
  const [localUser, setLocalUser] = useState(user);

  const handleChange = (field: string, value: string) => {
    const updatedUser: User = { ...localUser, [field]: value };
    setLocalUser(updatedUser);
    setUser(updatedUser);
  };

  const { firstName, lastName, email, password } = localUser;

  return (
    <div className="app__paform">
      <div className="app__paform-left">
        <input
          type="text"
          id="firstName"
          value={firstName}
          placeholder="First Name"
          className="app__paform-inputAlt"
          onChange={(e) => handleChange("firstName", e.target.value)}
        />
        <input
          type="text"
          id="lastName"
          value={lastName}
          placeholder="Last Name"
          className="app__paform-inputAlt"
          onChange={(e) => handleChange("lastName", e.target.value)}
        />
        <input
          id="email"
          type="email"
          value={email}
          placeholder="Email"
          className="app__paform-input"
          autoComplete="useremail@email.com"
          onChange={(e) => handleChange("email", e.target.value)}
        />
        <input
          id="password"
          type="password"
          value={password}
          placeholder="Password"
          className="app__paform-input"
          onChange={(e) => handleChange("password", e.target.value)}
        />
        <button onClick={handleRegister} className="app__paform-Btn">
          Register
        </button>
      </div>

      <div className="app__paform-left">
        <button className="app__google-Btn">
          <FaGoogle /> Continue with Google
        </button>
        <button className="app__facebook-Btn">
          <FaFacebook /> Continue with Facebook
        </button>
        <button className="app__apple-Btn">
          <FaApple /> Continue with Apple
        </button>
      </div>
      <small>
        <p>Already have an account?</p> <a href="/signin">SignIn!</a>
      </small>
    </div>
  );
};

export default PersonalAccountForm;
