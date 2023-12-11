import React, { useState } from "react";
import { authService } from "../../services/authService";
import "./Register.scss";

const RegisterInNav = () => {
  return (
    <div className="app__register-nav">
      <div className="app__register-nav-left">
        <a href="/">
          <img src="/ebaylogo.png" alt="ebaylogo" width={140} height={57} />
        </a>
      </div>
      <div className="app__register-nav-right">
        <a href="/survery">Tell us what you think</a>
      </div>
    </div>
  );
};

const RegisterForm: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = async () => {
    try {
      console.log(email, password); // Log the current values when the button is clicked
      await authService.register(email, password);
      console.log("Registration was successful");
    } catch (error) {
      console.error(`Registration failed due to: ${error}`);
      alert(error);
    }
  };

  return (
    <>
      <RegisterInNav />
      <div className="app__register-container ">
        <h2>Register</h2>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="app__register-input"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="app__register-input"
        />
        <button onClick={handleRegister} className="app__register-Btn">
          Register
        </button>
        <small>
          {" "}
          <p> Already have an account ?</p> <a href="/signin">SignIn!</a>
        </small>
      </div>
    </>
  );
};

export default RegisterForm;
