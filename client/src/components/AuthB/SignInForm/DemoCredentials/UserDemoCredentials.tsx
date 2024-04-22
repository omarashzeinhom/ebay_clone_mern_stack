import { useState } from "react";
import "./DemoCredentials.scss"; // Assuming you have a separate SCSS file for styling

const UserDemoCredentials = () => {
    //TODO SPLIT SIGN IN BY SELECTED OPTION
    const [selectedCredential, setSelectedCredential] = useState<"User">("User");

    const handleCredentialChange = (credentialType: "User") => {
        setSelectedCredential(credentialType);
    };

    const copyEmailToClipboard = () => {
        const email = "johndoe@email.com" ;
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
                        value="User"
                        checked={selectedCredential === "User"}
                        onChange={() => handleCredentialChange("User")}
                        
                    />
                    User
                </label>
            
            </div>
            {selectedCredential === "User" && (
                <details className="demo-credentials" open={selectedCredential === "User"}>
                    <summary>DEMO Credentials for User</summary>
                    <div className="credential">
                        <h6>
                            <em>Email:</em> johndoe@email.com
                        </h6>
                       <button aria-label="DemoEmail" className="copy-button" onClick={copyEmailToClipboard}>Copy Email</button>
                    </div>
                    <div className="credential">
                        <h6>
                            <em>Password:</em> 123456789
                        </h6>
                       <button aria-label="DemoPassword" className="copy-button" onClick={copyPasswordToClipboard}>Copy Password</button>
                    </div>
                    <div className="credential">
                        <h6>
                            <em>Full Name:</em> John Doe
                        </h6>
                    </div>
                </details>
            )}
          
        </div>
    );
};

export default UserDemoCredentials;
