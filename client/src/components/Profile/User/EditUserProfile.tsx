import { ChangeEvent, FormEvent, useState } from "react";
import { User, UpdatedUser } from "../../../models";
import { useAuth } from "../../../context/AuthContext";
import { UpdatedUserFormData } from "../../../models/updateduser";
import { userUpdatesFullUploadUri } from "../../../utilities/constants";
import { authService } from "../../../services/authService";

interface EditUserProfileProps {
  user: User;
  setUser: React.Dispatch<React.SetStateAction<User>>;
  updatedUser: UpdatedUser | undefined; // New state variable
  setUpdatedUser: React.Dispatch<React.SetStateAction<UpdatedUser | undefined>>;
}

const EditUserProfile: React.FC<EditUserProfileProps> = () => {
  const { updatedUser, token, user} =
    useAuth();

  let firstName = user?.firstName || updatedUser?.updatedFirstName || "";
  let lastName = user?.lastName || updatedUser?.updatedLastName || "";
  let email = user?.email || updatedUser?.updatedEmail || "";
  let avatar = user?.avatar || updatedUser?.updatedAvatar || "";
  let userId = user?.userId || updatedUser?.userId || "";

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const userIdStrVal = JSON.stringify(`${userId}`);

  const [formData, setFormData] = useState<UpdatedUserFormData>({
    userId: userIdStrVal,
    updatedFirstName: "",
    updatedLastName: "",
    updatedEmail: "",
    updatedAvatar: "",
    updatedPassword: "",
  });

  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>,
    fieldName: string
  ) => {
    if (
      fieldName === "updatedAvatar" &&
      e.target &&
      e.target instanceof HTMLInputElement &&
      e.target.files
    ) {
      const inputElement = e.target as HTMLInputElement;
      setFormData((prevState) => ({
        ...prevState,
        [fieldName]: inputElement.files![0],
      }));
    } else {
      const { name, value } = e.target;
      setFormData((prevState) => ({
        ...prevState,
        [name]: value,
      }));
    }
  };

  console.log(
    `user ===> ${JSON.stringify(
      user
    )} and its props ===>> ${userId} ${firstName} ${lastName} ${email} ${avatar}`
  );

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();

    try {
      setLoading(true);
      setError(null);
      const cloudinaryFormData = new FormData();
      cloudinaryFormData.append("file", formData.updatedAvatar as File);
      cloudinaryFormData.append(
        "upload_preset",
        `${process.env.REACT_APP_CLOUDINARY_UPLOAD_PRESET}`
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

      // Upload the image file to Cloudinary
      // Check if the updated user data is different from the previous user data
      if (
        updatedUser &&
        (updatedUser?.updatedFirstName !== user?.firstName ||
          updatedUser?.updatedLastName !== user?.lastName ||
          updatedUser?.updatedEmail !== user?.email ||
          updatedUser?.updatedAvatar !== user?.avatar)
      ) {
     
        // Store the Cloudinary URL in MongoDB
        const userData = {
          userId: formData.userId,
          firstName: formData.updatedFirstName,
          lastName: formData.updatedLastName,
          email: formData.updatedEmail,
          avatar: cloudinaryImageUrl, // Store the Cloudinary URL here
        };

        console.log("userData====>" + JSON.stringify(userData));

        const data = await authService.updateUser(
          {
            userId: formData.userId,
            updatedFirstName: formData.updatedFirstName,
            updatedLastName: formData.updatedLastName,
            updatedEmail: formData.updatedEmail,
            updatedAvatar: cloudinaryImageUrl,
          },
          userId,
          token || ""
        );

        console.log("User updated", data);
        // Resetting the form after successful submission
        setFormData((prevState) => ({
          ...prevState,
          img: "", // Reset img property to an empty string
        }));
      }
    } catch (error) {
      console.error("Error updating user:", error);
      setError("Failed to update the user. Please try again."); // Set an appropriate error message
    } finally {
      setLoading(false);
    }
  };

  console.log(updatedUser);

  return (
    <div className="app-profile-container__form">
      <form onSubmit={handleSubmit}>
        {loading && <p>Loading...</p>}
        {error && <p style={{ color: "red" }}>{error}</p>}
        <div className="app-profile-container__form__group">
          <div className="app-profile-container__form__group">
            <input
              value={user?.userId}
              placeholder={user?.userId}
              type="text"
              name="userId"
              hidden
              onChange={(e) => handleInputChange(e, "userId")}
            />
          </div>

          <div className="app-profile-container__form__group">
            <label>
              Email
              <input
                value={updatedUser?.updatedEmail}
                placeholder={user?.email}
                type="email"
                name="updatedEmail"
                onChange={(e) => handleInputChange(e, "updatedEmail")}
              />
            </label>
          </div>
          <div className="app-profile-container__form__group">
            <label>
              Password
              <input
                value={updatedUser?.updatedPassword}
                placeholder={user?.password}
                type="password"
                hidden
                name="updatedPassword"
                onChange={(e) => handleInputChange(e, "updatedPassword")}
              />
            </label>
          </div>
          <label>
            First Name
            <input
              placeholder={user?.firstName}
              value={updatedUser?.updatedFirstName}
              type="text"
              name="updatedFirstName"
              onChange={(e) => handleInputChange(e, "updatedFirstName")}
            />
          </label>
        </div>
        <div className="app-profile-container__form__group">
          <label>
            Last Name
            <input
              placeholder={user?.lastName}
              value={updatedUser?.updatedLastName}
              type="text"
              name="updatedLastName"
              onChange={(e) => handleInputChange(e, "updatedLastName")}
            />
          </label>
        </div>

        <label> Avatar </label>

        <input
          id="avatarFile"
          placeholder="Upload Avatar Image Here"
          name="updatedAvatar" // need to pass another hidden input as string when full product is successfull
          type="file"
          accept="image/*"
          //disabled={true}
          alt={user?.firstName || user?.email || "User Avatar"}
          onChange={(e) => handleInputChange(e, "updatedAvatar")}
        />
        <input
          id="avatar"
          name="updatedAvatar" // need to pass another hidden input as string when full product is successfull
          type="text"
          accept="image/*"
          hidden={true}
          onChange={(e) => handleInputChange(e, "updatedAvatar")}
        />
         
       <button aria-label="UpdateUserInformationButton" type="submit">Update User</button>
      </form>
    </div>
  );
};

export default EditUserProfile;
