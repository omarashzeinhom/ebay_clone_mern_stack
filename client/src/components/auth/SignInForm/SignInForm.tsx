import "./SignInForm.scss";
import { useAuth } from "../../../context/AuthContext";
import { authService } from "../../../services/authService";
import { summaryBoxText } from "../../../utilities/constants";
import { useState, useEffect } from "react";
import { FaFacebook, FaGoogle, FaApple } from "react-icons/fa";
import DemoCredentials from "./DemoCredentials";

export const SignInNav = () => {
  return (
    <div className="app__signin-nav">
      <div className="app__signin-nav-left">
        <a href="/">
          <img
            src="/ebaylogo.png"
            alt="ebaylogo"
            width={140}
            height={57}
            loading="lazy"
          />
        </a>
      </div>

      <div className="app__signin-nav-right">
        <a href="/survey">Tell us what you think</a>
      </div>
    </div>
  );
};

const SignInForm: React.FC = () => {
  const { login, loginBusiness, token, user, business } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [notification, setNotification] = useState<string | null>(null);

  const showNotification = (message: string) => {
    setNotification(message);
    // Clear the notification after a certain time
    setTimeout(() => {
      setNotification(null);
    }, 3000); // Adjust the duration as needed
  };

  const handleSignIn = async () => {
    try {
      // Try signing in as a regular user
      const userToken = await authService.login(email, password);
      const userData = await authService.getUser(userToken);
      login(userToken, userData);

      // Show success notification
      showNotification("User Login Successful!");

      console.log(`User Login successful: ${email}`);
    } catch (userError) {
      console.log(userError);

      try {
        // If signing in as a regular user fails, try signing in as a business
        const businessToken = await authService.loginBusiness(email, password);
        const businessData = await authService.getBusiness(businessToken);
        loginBusiness(businessToken, businessData);

        // Show success notification
        showNotification("Business Login Successful!");

        console.log(`Business Login successful: ${email}`);
      } catch (businessError) {
        // If both attempts fail, log the error
        console.error(`Error in handleSignIn: ${userError || businessError}`);
        // Show error notification
        showNotification("Login failed. Please try again.");
      }
    }
  };

  useEffect(() => {
    if (token) {
      // Fetch user or business information when the component mounts
      const fetchData = async () => {
        try {
          const data = await authService?.getUser(token);
          login(token, data);
        } catch (error) {
          console.error(`Error fetching data: ${error}`);
          try {
            const dataB = await authService?.getBusiness(token);
            loginBusiness(token, dataB);
          } catch (businessError) {
            console.error(businessError);
          }
        }
      };

      fetchData();
    }
    // eslint-disable-next-line
  }, [token]);

  const userLink = `/user/${user?.userId}`;
  const businessLink = `/business/${business?.businessId}`;



  return (
    <div className="app__signin">
      <SignInNav />
      {notification && <div className="notification">{notification}</div>}

      {token ? (
        <div className="app__signin-container">
          <p> Nothing to show here already Signed in As</p>
          <a href={userLink || businessLink || ""}>
            {user?.email ||
              business?.businessName ||
              "No user data was found !"}
          </a>
          <hr />

          <a href="/">Return Home</a>
        </div>
      ) : (
        <div className="app__signin-container">
          <h1>Hello</h1>
          <h4>
            Sign in to eBay or <a href="/register">create an account</a>
          </h4>
         <DemoCredentials/>
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
            <small>{summaryBoxText}</small>
          </details>

        </div>
      )}
    </div>
  );
};

export default SignInForm;


