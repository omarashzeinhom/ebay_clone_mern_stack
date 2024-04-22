import { useState } from "react";
import "./DemoCredentials.scss"; // Assuming you have a separate SCSS file for styling

const BusinessDemoCredentials = () => {
    //TODO SPLIT SIGN IN BY SELECTED OPTION
    const [selectedCredential, setSelectedCredential] = useState<"Business">("Business");

    const handleCredentialChange = (credentialType:  "Business") => {
        setSelectedCredential(credentialType);
    };

    const copyEmailToClipboard = () => {
        const email = "mariadoeinc@email.com";
        navigator.clipboard.writeText(email);
        alert("Email copied to clipboard!");
    };

    const copyPasswordToClipboard = () => {
        const password = "123456789";
        navigator.clipboard.writeText(password);
        alert("Password copied to clipboard!");
    };

    return (
        <div>
            <h4>Credentials:</h4>
            <div className="credential-radio">
               
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
            {selectedCredential === "Business" && (
                <details className="demo-credentials" open={selectedCredential === "Business"}>
                    <summary>DEMO Credentials for Business</summary>
                    <div className="credential">
                        <h6>
                            <em>Email:</em> mariadoeinc@email.com
                        </h6>
                       <button aria-label="CopyDemoBussinessEmailButton" className="copy-button" onClick={copyEmailToClipboard}>Copy Email</button>
                    </div>
                    <div className="credential">
                        <h6>
                            <em>Password:</em> 123456789
                        </h6>
                       <button aria-label="CopyDemoBussinessPasswordButton" className="copy-button" onClick={copyPasswordToClipboard}>Copy Password</button>
                    </div>
                    <div className="credential">
                        <h6>
                            <em>Full Name:</em> Maria Doe
                        </h6>
                    </div>
                </details>
            )}
        </div>
    );
};

export default BusinessDemoCredentials;
