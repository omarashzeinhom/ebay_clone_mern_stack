import "./SignInForm.scss";
import { useState } from "react";
import { useBusinessAuth, useUserAuth } from "../../../context/";
import { BottomSignInSection } from "./DemoCredentials/constants";
import { BusinessSignInForm, UserSignInForm } from ".";

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
  const [selectedCredential, setSelectedCredential] = useState<
    "User" | "Business"
  >("User");

  const handleCredentialChange = (credentialType: "User" | "Business") => {
    setSelectedCredential(credentialType);
  };
  //TODO ADD useUserAuth and useBusinessAuth
  const { userToken, user } = useUserAuth();
  const { businessToken, business } = useBusinessAuth();

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

  return (
    <>
      {businessToken || userToken ? (
        <SignedInContainer />
      ) : (
        <>
          <SignInNav />
          <h4>Sign in as:</h4>
          <div className="credential-radio">
            <label>
              <input
                type="radio"
                name="credentialType"
                value="User"
                checked={selectedCredential === "User"}
                onChange={() => handleCredentialChange("User")}
              />
              User
            </label>
            <label>
              <input
                type="radio"
                name="credentialType"
                value="Business"
                checked={selectedCredential === "Business"}
                onChange={() => handleCredentialChange("Business")}
              />
              Business
            </label>
          </div>
          {selectedCredential === "User" && (
            // Render the user sign-in form
            <UserSignInForm />
          )}
          {selectedCredential === "Business" && (
            // Render the business sign-in form
            <BusinessSignInForm />
          )}
        </>
      )}
      <BottomSignInSection />
    </>
  );
};

export default SignInForm;
