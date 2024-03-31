
import { useEffect } from "react";
import { SignInForm } from "../../components"


export default function SignIn() {
  useEffect(() => {
    document.title = 'SignIn'; // Set your desired dynamic page title here
    return () => {
      // Optionally, you can reset the title when the component unmounts
      document.title = 'Your Default Title';
    };
  }, []);
  return <SignInForm/>;
}
