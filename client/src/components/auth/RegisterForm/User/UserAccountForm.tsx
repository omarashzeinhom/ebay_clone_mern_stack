import "./UserAccountForm.scss";
import React, { useState } from "react";
import { User } from "../../../../models/user";
import { FaGoogle, FaFacebook, FaApple } from "react-icons/fa";

interface UserAccountFormProps {
  user: User;
  handleRegister: () => void;
  setUser: React.Dispatch<
    React.SetStateAction<User>
  >;
  
}

const UserAccountForm: React.FC<UserAccountFormProps> = ({
  user,
  handleRegister,
  setUser,
}) => {
  const [localUser, setLocalUser] = useState<User>(user);


  const handleChange = (field: string, value: string) => {
    const updatedUser: User = {
      ...localUser,
      [field]: value, // Update the specific field in the updatedUser
    };
    setLocalUser(updatedUser);
    setUser(updatedUser);
  };
  const { firstName, lastName, email, password, avatar } = localUser;

  //console.log(avatar);
  // console.log(`https://res-console.cloudinary.com/dmbzzkneb/media_explorer_thumbnails/${myImage}`)

  return (
    <form className="app__paform" method="POST">
      <div className="app__paform-left">
        <input
          type="text"
          id="firstName"
          required
          value={firstName}
          placeholder="First Name"
          className="app__paform-inputAlt"
          onChange={(e) => handleChange("firstName", e.target.value)}
        />
        <input
          type="text"
          id="lastName"
          required

          value={lastName}
          placeholder="Last Name"
          className="app__paform-inputAlt"
          onChange={(e) => handleChange("lastName", e.target.value)}
        />
        <input
          id="email"
          required
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
          autoComplete="current-password"
          placeholder="Password"
          className="app__paform-input"
          onChange={(e) => handleChange("password", e.target.value)}
        />
        <input
        id="avatar"
        type="text"
        hidden
        value={avatar}
        className="app__paform-Btn"
        onChange={(e) => handleChange("avatar", e.target.value)}
        />
        {/*ADD HIDDEN INPUT WITH IMAGE URL */}

        <button onClick={handleRegister} className="app__paform-Btn" type="button" >
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
    </form>
  );
};

export default UserAccountForm;
