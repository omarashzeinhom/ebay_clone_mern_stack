import { useState } from "react";
import { User } from "../../../models/user";
import { useAuth } from "../../../context/AuthContext";

interface EditUserProfileProps {
  user: User;
  updateUser: (selectedAvatar: File | undefined) => Promise<void>; // Updated the function signature
  setUser: React.Dispatch<React.SetStateAction<User>>;
}

const EditUserProfile: React.FC<EditUserProfileProps> = ({ user, setUser }) => {
  const { updateUser } = useAuth();
  let { firstName, lastName, email, avatar } = user;
  const [selectedAvatar, setSelectedAvatar] = useState<File | undefined>(
    undefined
  );


  let [updatedUser, setUpdatedUser] = useState({
    updatedFirstName: "",
    updatedLastName: "",
    updatedEmail: "",
    updatedAvatar: "",
  });

  const [formData, setFormData] = useState({
    updatedFirstName: "",
    updatedLastName: "",
    updatedEmail: "",
    updatedAvatar: "",
  });




  const handleInputChange = (e: React.FormEvent | any) => {
    const { name, value } = e?.target;
    setUpdatedUser((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

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

  console.log(updatedUser);

  return (
    <div className="app-profile-container__form">
      <form onSubmit={handleSubmit}>
        <div className="app-profile-container__form__group">
          <label>
            {" "}
            First Name
            <input
              placeholder={user?.firstName || "John"}
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
              placeholder={user?.email || "useremail@tmail.com"}
              type="email"
              name="updatedEmail"
              onChange={handleInputChange}
            />
          </label>
          {typeof user?.avatar === "string" && (
            <img src={user?.avatar || " "} alt={user?.email || "User Photo"} />
          )}{" "}
        </div>
        <label> Avatar </label>
        <input
          id="avatarUrl"
          className=""
          alt={user?.firstName || user?.email || "User Avatar"}
          type="file"
          name="updatedAvatar"
          onChange={(e) => {
            const file = e.target.files?.[0];
            handleFileChange(file);
          }}
        />
        <hr />
        <button type="submit" onSubmit={handleSubmit}>
          Update User
        </button>
      </form>
    </div>
  );
};

export default EditUserProfile;
