import "./UserAccountForm.scss";
import React, { ChangeEvent, FormEvent, useState } from "react";
import { RegisterUserFormData, User } from "../../../../models/user";
import { FaGoogle, FaFacebook, FaApple } from "react-icons/fa";
import { userUpdatesFullUploadUri } from "../../../../utilities/constants";
import { userAuthService } from "../../../../services";

interface UserAccountFormProps {
  user: User;
  handleRegister: () => void;
  setUser: React.Dispatch<React.SetStateAction<User>>;
}

const UserAccountForm: React.FC<UserAccountFormProps> = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [formData, setFormData] = useState<RegisterUserFormData>({
    userId: "",
    firstName: " ",
    lastName: " ",
    email: " ",
    avatar: " ",
    password: " ",
  });
  console.log("UserAccountForm formData===>", +formData);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      setLoading(true);
      setError(null);

      // Upload the image file to Cloudinary
      const cloudinaryFormData = new FormData();
      cloudinaryFormData.append("file", formData.avatar as File);
      cloudinaryFormData.append(
        "upload_preset",
        `${process.env.REACT_APP_CLODUINARY_USER_AVATARS_UPLOAD_PRESET}`
      );

      const cloudinaryResponse = await fetch(userUpdatesFullUploadUri, {
        method: "POST",
        body: cloudinaryFormData,
      });

      if (!cloudinaryResponse.ok) {
        const errorDetails = await cloudinaryResponse.json();
        console.error("Cloudinary API Error:", errorDetails);
        throw new Error("Failed to upload image to Cloudinary");
      }

      const cloudinaryData = await cloudinaryResponse.json();
      const cloudinaryImageUrl = cloudinaryData.secure_url;

      // Store the Cloudinary URL in MongoDB
      const userData = {
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        avatar: cloudinaryImageUrl, // ADD Generic Types for image
        password: formData.password,
      };

      console.log("productData====>" + userData);

      // Call your backend service to store the product data in MongoDB
      const data = await userAuthService.register({
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        avatar: cloudinaryImageUrl, // ADD Generic Types for image
        password: formData.password,
      });
      console.log("User created:", data);

      // Resetting the form after successful submission
      setFormData((prevState: any) => ({
        ...prevState,
        avatar: "", // Reset img property to an empty string
      }));
    } catch (error) {
      console.error("Error creating User:", error);
      setError("Failed to create the User. Please try again.");
    } finally {
      setLoading(false);
    }
  };
  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>,
    fieldName: string
  ) => {
    if (
      fieldName === "avatar" &&
      e.target &&
      e.target instanceof HTMLInputElement &&
      e.target.files
    ) {
      const inputElement = e.target as HTMLInputElement;
      setFormData((prevState: any) => ({
        ...prevState,
        [fieldName]: inputElement.files![0],
      }));
    } else {
      const { name, value } = e.target;
      setFormData((prevState: any) => ({
        ...prevState,
        [name]: value,
      }));
    }
  };

  return (
    <div className="app__paform">
      <form onSubmit={handleSubmit}>
        {loading && <p>Loading...</p>}
        {error && <p style={{ color: "red" }}>{error}</p>}
        <div className="app__paform-left">
          <label>
            First Name
            <input
              name="firstName"
              type="text"
              required
              placeholder="FirstName"
              className="app__paform-inputAlt"
              onChange={(e) => handleChange(e, "firstName")}
            />
          </label>
          <label>
            Last Name
            <input
              name="lastName"
              type="text"
              required
              placeholder="Last Name"
              className="app__paform-inputAlt"
              onChange={(e) => handleChange(e, "lastName")}
            />
          </label>
          <label>
            Email
            <input
              name="email"
              required
              type="email"
              placeholder="Email"
              className="app__paform-input"
              autoComplete="useremail@email.com"
              onChange={(e) => handleChange(e, "email")}
            />
          </label>

          <label>
            Password
            <input
              name="password"
              type="password"
              autoComplete="current-password"
              placeholder="Password"
              className="app__paform-input"
              onChange={(e) => handleChange(e, "password")}
            />
          </label>
          <label>
            Avatar
            <input
              placeholder="Upload Product Image Here"
              name="avatar"
              type="file"
              accept="image/*"
              onChange={(e) => handleChange(e, "avatar")}
            />
            <input
              name="" // need to pass another hidden input as string when full product is successfull
              type="text"
              accept="image/*"
              hidden={true}
              onChange={(e) => handleChange(e, "avatar")}
            />
          </label>

         <button aria-label="UserRegisterButton" className="app__paform-Btn" type="submit">
            Register
          </button>
        </div>
      </form>
      <div className="app__paform-right">
       <button aria-label="UserRegisterWithGoogle" className="app__google-Btn">
          <FaGoogle /> Continue with Google
        </button>
       <button aria-label="UserRegisterWithFaceBook" className="app__facebook-Btn">
          <FaFacebook /> Continue with Facebook
        </button>
       <button aria-label="UserRegisterWithApple" className="app__apple-Btn">
          <FaApple /> Continue with Apple
        </button>
        <small>
          <p>Already have an account?</p> <a href="/signin">SignIn!</a>
        </small>
      </div>
    </div>
  );
};

export default UserAccountForm;
