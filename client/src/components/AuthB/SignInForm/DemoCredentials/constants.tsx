import { summaryBoxText } from "../../../../utilities/constants";

export const BottomSignInSection = () => {
    return (
      <div className="app__signin-container">
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
  