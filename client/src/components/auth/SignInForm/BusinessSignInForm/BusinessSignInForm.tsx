import { useState, useEffect } from "react";
import { FaFacebook, FaApple, FaGoogle } from "react-icons/fa";
import { useBusinessAuth } from "../../../../context";
import { businessAuthService } from "../../../../services";
import BusinessDemoCredentials from "../DemoCredentials/BusinessDemoCredentials";


const BusinessSignInForm: React.FC = () => {
  //TODO ADD useUserAuth and useBusinessAuth
  const { loginBusiness, businessToken, business } = useBusinessAuth();

  // TODO need to switch token to businessToken and userToken
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [notification, setNotification] = useState<string | null>(null);

  const showNotification = (message: string) => {
    setNotification(message);
    setTimeout(() => {
      setNotification(null);
    }, 3000);
  };

  const handleBusinessSignIn = async () => {
   try {
        const businessToken = await businessAuthService.loginBusiness(
          email,
          password
        );
        const businessData = await businessAuthService.getBusiness(
          businessToken
        );
        loginBusiness(businessToken, businessData);
        showNotification("Business Login Successful!");
      } catch (businessError) {
        // Both user and business login failed
        console.error(`Error in handleSignIn: ${businessError}`);
        showNotification("Login failed. Please try again.");
      }

  };

  useEffect(() => {
    // Fetch user or business data after successful login
    const fetchBusinessData = async () => {
      
       if(businessToken){
        try {
            const businessData = await businessAuthService.getBusiness(
              businessToken
            );
            loginBusiness(businessToken, businessData);
          } catch (error) {
            console.error(`Error fetching Business data: ${error}`);
          }
       }
    
    };

    fetchBusinessData();

  }, [ businessToken, loginBusiness]);

  const businessLink = `/business/${business?.businessId}`;

  // Better Organized Components
  const SignedInContainer = () => {
    return (
      <div className="app__signin-container">
        <p> Nothing to show here already Signed in As</p>
        <a href={businessLink || ""}>
          { business?.businessName || "No Business data was found !"}
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

      {businessToken ? (
        <SignedInContainer />
      ) : (
        <div className="app__signin-container">
          <h1>Hello</h1>
          <h4>
            Sign in to eBay or <a href="/register">create an account</a>
          </h4>
          <h5>Business Sign In </h5>
          <BusinessDemoCredentials/>
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
              onClick={handleBusinessSignIn}
              className="app__signin-Btn"
            >
              Continue
            </button>
          </div>
          <SSOButtons />
        </div>
      )}
    </div>
  );
};

export default BusinessSignInForm;
