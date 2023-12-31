import { useState } from "react";
import { User } from "../../../models/user";
import { useAuth } from "../../../context/AuthContext";

interface EditUserProfileProps {
  user: User;
  updateUser: (selectedAvatar: File | undefined) => Promise<void>; // Updated the function signature
  setUser: React.Dispatch<React.SetStateAction<User>>;
  updatedUser: UpdatedUser | undefined; // New state variable
  setUpdatedUser: React.Dispatch<React.SetStateAction<UpdatedUser | undefined>>;
}

const EditUserProfile: React.FC<EditUserProfileProps> = ({ user, setUser }) => {
  const { updateUser, updatedUser, setUpdatedUser } = useAuth();
  let { firstName, lastName, email, avatar } = user;
  const [selectedAvatar, setSelectedAvatar] = useState<File | undefined>(
    undefined
  );
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUpdatedUser((prevData) => ({
      ...prevData,
      [name]: value,
    }));
    setUser((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  console.log(
    `user ===> ${JSON.stringify(
      user
    )} and its props ===>> ${firstName} ${lastName} ${email} ${avatar}`
  );

  const handleFileChange = (file: File | undefined) => {
    setSelectedAvatar(file);
    if (file) {
      console.log(`File selected: ${file.name}`);
    } else {
      console.log("No file selected");
    }
  };

  const handleSubmit = async (event: React.FormEvent) => {
    try {
      setLoading(true);
      setError(null);
      event.preventDefault();
      await updateUser(selectedAvatar, updatedUser);
      setUpdatedUser((prevUser) => ({
        ...prevUser,
        firstName: updatedUser?.updatedFirstName || prevUser?.updatedFirstName,
        lastName: updatedUser?.updatedLastName || prevUser?.updatedLastName,
        email: updatedUser?.updatedEmail || prevUser?.updatedEmail,
        avatar: updatedUser?.updatedAvatar || prevUser?.updatedAvatar,
      }));
      setUser((prevUser) => ({
        ...prevUser,
        firstName: updatedUser?.updatedFirstName || prevUser?.firstName,
        lastName: updatedUser?.updatedLastName || prevUser?.lastName,
        email: updatedUser?.updatedEmail || prevUser?.email,
        avatar: updatedUser?.updatedAvatar || prevUser?.avatar,
      }));
    } catch (error) {
      console.error("Error creating product:", error);
      setError("Failed to create the product. Please try again."); // Set an appropriate error message
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
          <label>
            {" "}
            First Name
            <input
              placeholder={user?.firstName || "John"}
              value={updatedUser?.updatedFirstName || ""}
              type="text"
              onChange={handleInputChange}
              name="updatedFirstName"
            />
          </label>
        </div>
        <div className="app-profile-container__form__group">
          <label>
            {" "}
            Last Name
            <input
              placeholder={user?.lastName || "Doe"}
              value={updatedUser?.updatedLastName || ""}
              type="text"
              name="updatedLastName"
              onChange={handleInputChange}
            />
          </label>
        </div>
        <div className="app-profile-container__form__group">
          <label>
            {" "}
            Email
            <input
              value={updatedUser?.updatedEmail || ""}
              placeholder={user?.email || "useremail@tmail.com"}
              type="email"
              name="updatedEmail"
              onChange={handleInputChange}
            />
          </label>
          {typeof user?.avatar === "string" && (
            <img src={user?.avatar || " "} alt={user?.email || "User Photo"} loading="lazy"/>
          )}{" "}
        </div>
        <label> Avatar </label>
        <input
          id="avatarUrl"
          className=""
          alt={user?.firstName || user?.email || "User Avatar"}
          type="file"
          name="updatedAvatar"
          onChange={(e) => handleFileChange(e.target.files?.[0])}
        />
        <hr />
        <button type="submit">Update User</button>
      </form>
    </div>
  );
};

export default EditUserProfile;
