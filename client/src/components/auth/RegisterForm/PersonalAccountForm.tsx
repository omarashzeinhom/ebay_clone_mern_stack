import React, { useState } from "react";
import "./styles/PersonalAccountForm.scss";
import { FaGoogle, FaFacebook, FaApple } from "react-icons/fa";
import { User } from "../../../models/user";

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
    // Create a new User object with updated values
    const updatedUser: User = { ...localUser, [field]: value };

    // Update local state
    setLocalUser(updatedUser);

    // Update parent state with the new User object
    setUser(updatedUser);
  };
  const { firstName, lastName, email, password } = localUser;

  return (
    <>
      <h2>Register</h2>
      <input
        type="text"
        placeholder="First Name"
        value={firstName}
        onChange={(e) => handleChange("firstName", e.target.value)}
        className="app__register-input"
      />
      <input
        type="text"
        placeholder="Last Name"
        value={lastName}
        onChange={(e) => handleChange("lastName", e.target.value)}
        className="app__register-input"
      />
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => handleChange("email", e.target.value)}
        className="app__register-input"
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => handleChange("password", e.target.value)}
        className="app__register-input"
      />
      <button onClick={handleRegister} className="app__register-Btn">
        Register
      </button>
      <div className="social-buttons">
        <button className="google-button">
          <FaGoogle /> Continue with Google
        </button>
        <button className="facebook-button">
          <FaFacebook /> Continue with Facebook
        </button>
        <button className="apple-button">
          <FaApple /> Continue with Apple
        </button>
      </div>
      <small>
        <p>Already have an account?</p> <a href="/signin">SignIn!</a>
      </small>
    </>
  );
};

export default PersonalAccountForm;
