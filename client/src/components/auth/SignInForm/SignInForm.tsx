import "./SignInForm.scss";
import { summaryBoxText } from "../../../utilities/constants";
import { useState, useEffect } from "react";
import { FaFacebook, FaApple, FaGoogle } from "react-icons/fa";
import DemoCredentials from "./DemoCredentials/DemoCredentials";
import { userAuthService } from "../../../services/userAuthService";
import { businessAuthService } from "../../../services/businessAuthService";
import { useBusinessAuth } from "../../../context/BusinessAuthContext";
import { useUserAuth } from "../../../context/UserAuthContext";

export const SignInNav = () => {
  return (
    <div className="app__signin-nav">
      <div className="app__signin-nav-left">
        <a href="/">
          <img
            rel="preload"
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
  //TODO ADD useUserAuth and useBusinessAuth
  const { login, userToken, user } = useUserAuth();
  const { loginBusiness, businessToken, business } = useBusinessAuth();

  // TODO need to switch token to businessToken and userToken
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
    // TODO: Handle SignIn For User and Business Seperately with conditons
    try {
      // Try signing in as a regular user
      const userToken = await userAuthService.login(email, password);
      const userData = await userAuthService.getUser(userToken);
      login(userToken, userData);
      // Show success notification
      showNotification("User Login Successful!");
      console.log(`User Login successful: ${email}`);
    } catch (userError) {
      console.error(userError);
      try {
        // If signing in as a regular user fails, try signing in as a business
        const businessToken = await businessAuthService.loginBusiness(
          email,
          password
        );
        const businessData = await businessAuthService.getBusiness(
          businessToken
        );
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
    const fetchUserData = async () => {
      if (userToken) {
        try {
          const data = await userAuthService?.getUser(userToken);
          login(userToken, data);
        } catch (error) {
          console.error(`Error fetching User data: ${error}`);
        }
      }
    };

    const fetchBusinessData = async () => {
      if (businessToken) {
        try {
          const dataB = await businessAuthService?.getBusiness(businessToken);
          loginBusiness(businessToken, dataB);
        } catch (businessError) {
          console.error(`Error fetching Business Data: ${businessError}`);
        }
      }
    };

    if (businessToken) {
      fetchBusinessData();
    }

    if (userToken) {
      fetchUserData();
    }

    // eslint-disable-next-line
  }, [userToken, businessToken]);

  const userLink = `/user/${user?.userId}`;
  const businessLink = `/business/${business?.businessId}`;

  // Better Organized Components
  const SignedInContainer = () => {
    return (
      <div className="app__signin-container">
        <p> Nothing to show here already Signed in As</p>
        <a href={userLink || businessLink || ""}>
          {user?.email || business?.businessName || "No user data was found !"}
        </a>
        <br />
        <a href="/">
          {" "}
          <button aria-label="ReturnHomeButton" className="app__signin-Btn">
            Return Home{" "}
          </button>
        </a>
      </div>
    );
  };

  const SignInForm = () => {
    return (
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
        <button
          aria-label="SignInButton"
          onClick={handleSignIn}
          className="app__signin-Btn"
        >
          Continue
        </button>
      </div>
    );
  };

  const BottomSignInSection = () => {
    return (
      <div>
        <label>
          Stay signed in
          <input
            type="checkbox"
            placeholder="Stay signed in"
            color="black"
            id="staySignedIn"
          />
        </label>
        <br />
        <small>
          Using a public or shared device? Uncheck to protect your account.
        </small>
        <details>
          <summary>Learn More</summary>
          <small>{summaryBoxText}</small>
        </details>
      </div>
    );
  };

  const SSOButtons = () => {
    return (
      <>
        <button aria-label="SignInWithFaceBook" className="app__signin-Btn">
          <FaFacebook /> Continue with Facebook
        </button>
        <button aria-label="SignInWithGoogle" className="app__signin-Btn-alt">
          <FaGoogle /> Continue with Google
        </button>
        <button aria-label="SignInWithApple" className="app__signin-Btn-alt">
          <FaApple /> Continue with Apple
        </button>
      </>
    );
  };

  return (
    <div className="app__signin">
      <SignInNav />
      {notification && <div className="notification">{notification}</div>}

      {businessToken || userToken ? (
        <SignedInContainer />
      ) : (
        <div className="app__signin-container">
          <h1>Hello</h1>
          <h4>
            Sign in to eBay or <a href="/register">create an account</a>
          </h4>
          <DemoCredentials />
          <SignInForm />
          <SSOButtons />
          <BottomSignInSection />
        </div>
      )}
    </div>
  );
};

export default SignInForm;
