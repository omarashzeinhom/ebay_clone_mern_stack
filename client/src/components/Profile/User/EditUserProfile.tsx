import { useState } from "react";
import { User } from "../../../models/user";

interface EditUserProfileProps {
  user: User;
  updateUser: (selectedAvatar: File | undefined) => Promise<void>; // Updated the function signature
  setUser: React.Dispatch<React.SetStateAction<User>>;
}

const EditUserProfile: React.FC<EditUserProfileProps> = ({
  user,
  updateUser,
  setUser,
}) => {
  const { firstName, lastName, email, avatar } = user;
  const [selectedAvatar, setSelectedAvatar] = useState<File | undefined>(
    undefined
  );

  console.log(
    `user ===> ${user} and its props ===>> ${firstName} ${lastName} ${email} ${avatar}`
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
    event.preventDefault();
    // Pass the selectedAvatar to the updateUser function
    await updateUser(selectedAvatar);
  };

  return (
    <div className="app-profile-container__form">
      <form onSubmit={handleSubmit}> 
        <div className="app-profile-container__form__group">
          <label> First Name </label>
          <input
            id="firstName"
            className=""
            alt=""
            placeholder={user?.firstName || "John"}
            type="text"
            onChange={(e) =>
              setUser((prevUser) => ({
                ...prevUser,
                firstName: e.target.value,
              }))
            }
          />
        </div>
        <div className="app-profile-container__form__group">
          <label> Last Name </label>
          <input
            id="lastName"
            className=""
            alt=""
            placeholder={user?.lastName || "Doe"}
            type="text"
            onChange={(e) =>
              setUser((prevUser) => ({ ...prevUser, lastName: e.target.value }))
            }
          />
        </div>
        <div className="app-profile-container__form__group">
          <label> Email</label>
          <input
            id="email"
            className=""
            alt=""
            placeholder={user?.email || "useremail@tmail.com"}
            type="email"
            onChange={(e) =>
              setUser((prevUser) => ({ ...prevUser, email: e.target.value }))
            }
          />
        </div>
        <div className="app-profile-container__form__group">
          <small></small>
          <img src={user?.avatar || " "} alt={user?.email || "User Photo"} />
        </div>
        <div className="app-profile-container__form__group">
          <label> Avatar </label>
          <input
            id="avatarUrl"
            className=""
            alt={user?.avatar || user?.email || "User Avatar"}
            placeholder=""
            type="file"
            onChange={(e) => {
              const file = e.target.files?.[0];
              handleFileChange(file);
            }}
          />
        </div>
        <hr />
        <button type="submit" onSubmit={handleSubmit} >Update User</button>
      </form>
    </div>
  );
};

export default EditUserProfile;
