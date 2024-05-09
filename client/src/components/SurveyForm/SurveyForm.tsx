import { Header, Loading, Nav, NotificationCard } from "..";
import { useRef, useState } from "react";
import emailjs from "@emailjs/browser";
import { useBusinessAuth, useUserAuth } from "../../context/";
import { SignInNav } from "../Auth/SignInForm/SignInForm";
import { commonIssues } from "../../utilities/constants";

interface Notification {
  type: "success" | "error";
  message: string;

}

export default function SurveyForm({ total, pageTitle }: any) {
  const { user } = useUserAuth();
  const { business } = useBusinessAuth();

  const form = useRef();
  const [notification, setNotification] = useState<Notification | null>(null);
  const [loading, setLoading] = useState(false); // New state for loading

  const name = user?.firstName;
  console.log(`name====${name}`);

  const sendEmail = () => {
    const SERVICE_ID = process.env.REACT_APP_EMAIL_JS_SERVICE_ID;
    const TEMPLATE_ID = process.env.REACT_APP_EMAIL_JS_TEMPLATE_ID;
    const PUBLIC_KEY = process.env.REACT_APP_EMAIL_JS_PUBLIC_KEY;

    if (form.current !== undefined) {
      emailjs
        .sendForm(
          `${SERVICE_ID}`, //"YOUR_SERVICE_ID",
          `${TEMPLATE_ID}`, //"YOUR_TEMPLATE_ID",
          form?.current,
          `${PUBLIC_KEY}` // PUBLIC_KEY
        )
        .then(
          (result) => {
            console.log(result.text);
            setLoading(false); // Set loading to false on successful submission
            setNotification({
              type: "success",
              message: "Email sent successfully!",
            });
          },
          (error) => {
            console.log(error.text);
            setLoading(false); // Set loading to false on error
            setNotification({
              type: "error",
              message: "Failed to send email. Please try again.",
            });
          }
        );
    }
  };

  const handleSubmitForm = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true); // Set loading to true when submitting the form
    sendEmail(); // Call sendEmail function to send the email
  };

  // Separate the logic for setting the placeholder
  let namePlaceholder = user
    ? user.firstName
    : business
    ? business.businessName
    : "User Not Logged In";

  return (
    <>
    <Header pageTitle={pageTitle}/>
      <Nav total={total} pageTitle="Survey" />
      <SignInNav />
      <h2> Survey </h2>
      {business || user ? (
        <>
          <form
            className="app__signin app__signin-container"
            onSubmit={handleSubmitForm}
          >
            <label>
              <em>Name:</em>
              <input
                placeholder={namePlaceholder}
                className="app__signin-input"
                defaultValue={user?.firstName || business?.businessName || ""}
                readOnly
              />
            </label>

            <label>
              <em> Email:</em>
              <input
                placeholder="johndoe@email.com"
                className="app__signin-input"
                defaultValue={`${user?.email || business?.businessEmail || ""}`}
                readOnly
              />
            </label>

            <label>
              <em>Message:</em>
              <textarea
                style={{ resize: "none" }}
                className="app__signin-input"
                placeholder="Example : I really like this website, and i want to contact the developer"
              ></textarea>
            </label>

            <label>
              <em>Common Issues:</em>
              <select className="app__signin-input">
                {commonIssues.map((issue, index) => {
                  return <option key={index}>{issue?.name}</option>;
                })}
              </select>
            </label>

            <button
              aria-label="MessageUsSurveyButton"
              className="app__signin-Btn"
              type="submit"
              disabled={loading}
            >
              Message
            </button>
          </form>

          {loading ? <Loading text="Sending..." /> : null}

          {/* Display success or error notification */}
          {notification && (
            <NotificationCard
              type={notification.type}
              message={notification.message}
            />
          )}
        </>
      ) : (
        <>
          <h2>
            Please <a href="/signin">Sign In</a> to Leave a Message or rating.
          </h2>
        </>
      )}
    </>
  );
}
