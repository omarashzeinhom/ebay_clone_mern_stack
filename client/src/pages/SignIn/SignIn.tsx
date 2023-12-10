import { FaFacebook, FaGoogle, FaApple } from "react-icons/fa";
import "./SignIn.scss";

export default function SignIn() {
  async function handleSignIn() {
    const query = "";
    console.log(`${query}`);
  }

  return (
    <div className="app__signin">
        <div className="app__signin-container">
        <h1>Hello</h1>
      <h4>
        Sign in to eBay or <a href="/register">create an account</a>
      </h4>
      <a href="/">
        <img src="/ebaylogo.png" alt="ebaylogo" width={250} height={100} />
      </a>
      <form className="app__signin-form" id="signin">
        <input placeholder="Email or username" className="app__signin-input" id="email" autoComplete="true"/>
      </form>
      <button onClick={handleSignIn} className="app__signin-Btn">Continue</button>
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
        <input type="checkbox" placeholder="Stay signed in" color="black" id="staySignedIn" />
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
          payment info. You can always turn off this feature in My eBay. We may
          ask you to sign in again for some activities, such as making changes
          to your account.
        </small>
      </details>
        </div>
     
    </div>
  );
}
