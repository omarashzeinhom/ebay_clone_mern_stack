import { useState } from "react";
import { User,UpdatedUser } from "../../../models";
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
  
    setUpdatedUser((prevData: any) => {
      // Create a new object with the previous state properties
      const updatedUser = { ...prevData };
  
      // Update the specific nested property based on the input name
      updatedUser[name] = value;
  
      return updatedUser;
    });
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
      
      // Check if the updated user data is different from the previous user data
      if (
        updatedUser &&
        (updatedUser.updatedFirstName !== user.firstName ||
          updatedUser.updatedLastName !== user.lastName ||
          updatedUser.updatedEmail !== user.email ||
          updatedUser.updatedAvatar !== user.avatar)
      ) {
        await updateUser(selectedAvatar, updatedUser);
        setUser((prevUser) => ({
          ...prevUser,
          firstName: updatedUser.updatedFirstName || prevUser.firstName,
          lastName: updatedUser.updatedLastName || prevUser.lastName,
          email: updatedUser.updatedEmail || prevUser.email,
          avatar: updatedUser.updatedAvatar || prevUser.avatar,
        }));
        setUpdatedUser(undefined); // Reset updatedUser after successful update
      } else {
        console.log("User data has not changed. No update required.");
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
          <label>
            {" "}
            Email
            <input
              value={updatedUser?.updatedEmail }
              placeholder={user?.email }
              type="email"
              name="updatedEmail"
              onChange={handleInputChange}
            />
          </label>
          
        </div>
        <div className="app-profile-container__form__group">
          
            <input
              value={updatedUser?.updatedPassword }
              placeholder={user?.password }
              type="password"
              hidden
              name="updatedPassword"
              onChange={handleInputChange}
            />
          
        </div>
          <label>
            {" "}
            First Name
            <input
              placeholder={user?.firstName }
              value={updatedUser?.updatedFirstName }
              type="text"
              name="updatedFirstName"
              onChange={handleInputChange}

            />
          </label>
        </div>
        <div className="app-profile-container__form__group">
          <label>
            {" "}
            Last Name
            <input
              placeholder={user?.lastName }
              value={updatedUser?.updatedLastName }
              type="text"
              name="updatedLastName"
              onChange={handleInputChange}
            />
          </label>
        </div>
   
        <label> Avatar </label>
        {typeof user?.avatar === "string" && (
            <img src={user?.avatar } alt={user?.email || "User Photo"} loading="lazy"/>
          )}{" "}
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
