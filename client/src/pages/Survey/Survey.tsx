import { useEffect } from "react";
import { SurveyForm } from "../../components";

const PageTitle = "Survey"

export default function Survey(){
  useEffect(() => {
    document.title = 'Survey'; // Set your desired dynamic page title here
    return () => {
      // Optionally, you can reset the title when the component unmounts
      document.title = 'Your Default Title';
    };
  }, []);
  return (
    <SurveyForm/>
  )
}