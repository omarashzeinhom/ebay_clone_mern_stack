import { useEffect } from "react";
import { RegisterForm } from "../../components";


export default function Register() {
  useEffect(() => {
    document.title = 'Register'; // Set your desired dynamic page title here
    return () => {
      // Optionally, you can reset the title when the component unmounts
      document.title = 'Register';
    };
  }, []);
  return <RegisterForm />;
}
