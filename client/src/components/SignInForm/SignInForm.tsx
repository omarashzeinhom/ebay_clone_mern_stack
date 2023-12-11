import { FaFacebook, FaGoogle, FaApple } from "react-icons/fa";
import "./SignInForm.scss";
import { useState,useEffect } from "react";
import { authService } from "../../services/authService";
import { useAuth } from "../../context/AuthContext";

const SignInNav = () => {
  return (
    <div className="app__signin-nav">
      <div className="app__signin-nav-left">
        <a href="/">
          <img src="/ebaylogo.png" alt="ebaylogo" width={140} height={57} />
        </a>
      </div>

      <div className="app__signin-nav-right">
        <a href="/survery">Tell us what you think</a>
      </div>
    </div>
  );
};

const SignInForm: React.FC = () => {
  const { login, token } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignIn = async () => {
    try {
      const newToken = await authService.login(email, password);
      const user = await authService.getUser(newToken);
      login(newToken, user);
      console.log(`Login successful: ${email}`);
    } catch (error) {
      console.error(`Error in handleSignIn: ${error}`);
    }
  };

  useEffect(() => {
    if (token) {
      // Fetch user information when the component mounts
      authService.getUser(token);
    }
  }, [token]);

  return (
    <div className="app__signin">
      <SignInNav />

      <div className="app__signin-container">
        <h1>Hello</h1>
        <h4>
          Sign in to eBay or <a href="/register">create an account</a>
        </h4>
        <div className="app__signin-form" id="signin">
          <input
            placeholder="Email or username"
            className="app__signin-input"
            id="email"
            autoComplete="true"
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
        type="password"
        placeholder="Password"
        className="app__signin-input"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
          <button onClick={handleSignIn} className="app__signin-Btn">
          Continue
        </button>
        </div>
    
        Or
        <button className="app__signin-Btn">
          <FaFacebook /> Continue with Facebook
        </button>
        <button className="app__signin-Btn-alt">
          <FaGoogle /> Continue with Google
        </button>
        <button className="app__signin-Btn-alt">
          <FaApple /> Continue with Apple
        </button>
        <div>
          <input
            type="checkbox"
            placeholder="Stay signed in"
            color="black"
            id="staySignedIn"
          />
          <small> Stay signed in</small>
        </div>
        <small>
          Using a public or shared device? Uncheck to protect your account.
        </small>
        <details>
          <summary>Learn More</summary>
          <small>
            With this box checked, we'll keep you signed in, making it easier to
            bid and buy. You'll also be all set to pay if you've saved your
            payment info. You can always turn off this feature in My eBay. We
            may ask you to sign in again for some activities, such as making
            changes to your account.
          </small>
        </details>
      </div>
    </div>
  );
};

export default SignInForm;
