import { ChangeEvent, FormEvent, useState } from "react";
import { User, UpdatedUser } from "../../../../models";
import { useUserAuth } from "../../../../context/";
import { UpdatedUserFormData } from "../../../../models/updateduser";
import { userUpdatesFullUploadUri } from "../../../../utilities/constants";
import { userAuthService } from "../../../../services";

interface EditUserProfileProps {
  user: User;
  setUser: React.Dispatch<React.SetStateAction<User>>;
  updatedUser: UpdatedUser | undefined; // New state variable
  setUpdatedUser: React.Dispatch<React.SetStateAction<UpdatedUser | undefined>>;
}

const EditUserProfile: React.FC<EditUserProfileProps> = () => {
  const { updatedUser, userToken, user } = useUserAuth();
  const userId = user?.userId || "";
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [formData, setFormData] = useState<UpdatedUserFormData>({
    _id: userId,
    firstName: "",
    lastName: "",
    email: "",
    avatar: "",
    password: "",
  });

  const handleInputChange = (
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
    `user ===> ${JSON.stringify(user)} and its props ===>> ${user?.userId} ${
      user?.firstName
    } ${user?.lastName} ${user?.email} ${user?.avatar}`
  );

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();

    try {
      setLoading(true);
      setError(null);
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

      // Upload the image file to Cloudinary
      // Check if the updated user data is different from the previous user data

      // Store the Cloudinary URL in MongoDB
      const userData = {
        _id: userId,
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        avatar: cloudinaryImageUrl, // Store the Cloudinary URL here
      };

      console.log("userData====>" + JSON.stringify(userData));

      const data = await userAuthService.updateUser(
        {
          _id: userId,
          firstName: formData.firstName,
          lastName: formData.lastName,
          email: formData.email,
          avatar: cloudinaryImageUrl,
        },
        userId,
        userToken || ""
      );

      console.log("User updated", data);
      // Resetting the form after successful submission
      setFormData((prevState) => ({
        ...prevState,
        avatar: "", // Reset img property to an empty string
      }));
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
      <h2>Work in Progress:</h2>

      <form onSubmit={handleSubmit}>
        {loading && <p>Loading...</p>}
        {error && <p style={{ color: "red" }}>{error}</p>}
        <div className="app-profile-container__form__group">
          <div className="app-profile-container__form__group">
            <input
              value={user?.userId}
              placeholder={user?.userId}
              type="text"
              name="_id"
              hidden
              onChange={(e) => handleInputChange(e, "_id")}
            />
          </div>

          <div className="app-profile-container__form__group">
            <label>
              Email
              <input
                value={updatedUser?.email}
                placeholder={user?.email}
                type="email"
                name="email"
                onChange={(e) => handleInputChange(e, "email")}
              />
            </label>
          </div>
          <div className="app-profile-container__form__group">
            <label>
              Password
              <input
                value={updatedUser?.password}
                placeholder={user?.password}
                type="password"
                hidden
                name="password"
                onChange={(e) => handleInputChange(e, "password")}
              />
            </label>
          </div>
          <label>
            First Name
            <input
              placeholder={user?.firstName}
              value={updatedUser?.firstName}
              type="text"
              name="firstName"
              onChange={(e) => handleInputChange(e, "firstName")}
            />
          </label>
        </div>
        <div className="app-profile-container__form__group">
          <label>
            Last Name
            <input
              placeholder={user?.lastName}
              value={updatedUser?.lastName}
              type="text"
              name="lastName"
              onChange={(e) => handleInputChange(e, "lastName")}
            />
          </label>
        </div>

        <label> Avatar </label>
        <input
          id="avatarFile"
          placeholder="Upload Avatar Image Here"
          name="avatar" // need to pass another hidden input as string when full product is successfull
          type="file"
          accept="image/*"
          alt={user?.firstName || user?.email || "User Avatar"}
          onChange={(e) => handleInputChange(e, "avatar")}
        />
        <input
          id="avatar"
          name="avatar" // need to pass another hidden input as string when full product is successfull
          type="text"
          accept="image/*"
          hidden={true}
          onChange={(e) => handleInputChange(e, "avatar")}
        />

        <button
          hidden={true}
          aria-label="UpdateUserInformationButton"
          type="submit"
        >
          Update User
        </button>
      </form>
    </div>
  );
};

export default EditUserProfile;
