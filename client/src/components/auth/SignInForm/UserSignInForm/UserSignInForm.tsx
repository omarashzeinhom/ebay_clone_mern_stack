import { useState, useEffect } from "react";
import { FaFacebook, FaApple, FaGoogle } from "react-icons/fa";
import { userAuthService } from "../../../../services";
import { useUserAuth } from "../../../../context";
import UserDemoCredentials from "../DemoCredentials/UserDemoCredentials";

const UserSignInForm: React.FC = () => {
  const { login, userToken, user } = useUserAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [notification, setNotification] = useState<string | null>(null);

  const showNotification = (message: string) => {
    setNotification(message);
    setTimeout(() => {
      setNotification(null);
    }, 3000);
  };

  const handleUserSignIn = async () => {
    try {
      const userToken = await userAuthService.login(email, password);
      const userData = await userAuthService.getUser(userToken);
      login(userToken, userData);
      showNotification(user?.firstName + "has logged in Successfully!");
    } catch (userError) {
      console.error("user SignIn Error:" + userError);
      showNotification("User Login failed. Please try again.");
    }
  };

  useEffect(() => {
    // Fetch user or business data after successful login
    const fetchUserData = async () => {
      if (userToken) {
        try {
          const userData = await userAuthService.getUser(userToken);
          login(userToken, userData);
        } catch (error) {
          console.error(`Error fetching User data: ${error}`);
        }
      }
    };

    fetchUserData();
  }, [userToken, login]);

  const userLink = `/user/${user?.userId}`;

  // Better Organized Components
  const SignedInContainer = () => {
    return (
      <div className="app__signin-container">
        <p> Nothing to show here already Signed in As</p>
        <a href={userLink || ""}>{user?.email || "No user data was found !"}</a>
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
      {notification && <div className="notification">{notification}</div>}

      {userToken ? (
        <SignedInContainer />
      ) : (
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
            <button
              aria-label="SignInButton"
              onClick={handleUserSignIn}
              className="app__signin-Btn"
            >
              Continue
            </button>
          </div>
          <SSOButtons />
        </div>
      )}
      <UserDemoCredentials />
    </div>
  );
};

export default UserSignInForm;
