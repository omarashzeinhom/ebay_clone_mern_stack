import { useNavigate, useParams } from "react-router-dom";
import "./Profile.scss";
import { useAuth } from "../../context/AuthContext";
import Nav from "../Nav/Nav";
import SearchBar from "../SearchBar/SearchBar";
import { Cloudinary } from "@cloudinary/url-gen";
import { useState } from "react";
import CloudinaryUploadWidget from "../auth/RegisterForm/CloudinaryUploadWidget/CloudinaryUploadWidget";
import axios from "axios"; // Import axios for making HTTP requests
import { User } from "../../models/user";

type ProfileProps = {
  total: number;
};

export default function Profile<User>({ total }: ProfileProps) {
  const [updatedUser, setUpdatedUser] = useState<User>();
  const [isEditing, setIsEditing] = useState("");
  const { user, business, token , setUser , fetchUserInformation} = useAuth();
  const navigate = useNavigate();
  const { businessId, userId } = useParams();

  console.log(userId);

  const [publicId, setPublicId] = useState("");
  const [cloudName] = useState(
    `${process.env.REACT_APP_CLOUDINARY_CLOUD_NAME}`
  );
  const [uploadPreset] = useState(
    `${process.env.REACT_APP_CLOUDINARY_UPLOAD_PRESET}`
  );
  const [uploadedImageUrl, setUploadedImageUrl] = useState<string | null>(null);

  const uwConfig = {
    cloudName,
    uploadPreset,
    cropping: true,
    multiple: false,
    folder: user
      ? "ebay-clone-images/user-avatars"
      : "ebay-clone-images/business-avatars",
    tags: [user ? "users" : "businesses"],
    theme: "blue",
  };

  const cld = new Cloudinary({
    cloud: {
      cloudName,
    },
  });

  const myImage = cld.image(publicId);
  console.log(user?.avatar );

  const handleImageUpload = async (url: string) => {
    try {
      // Make a request to your server to store the image URL in MongoDB
      await axios.patch("http://localhost:3001/auth/update-avatar", { avatar: user?.avatar }, {
        headers: { Authorization: `Bearer ${token}` },
      });

      // Update the local user state with the new avatar
      setUser((prevUser) => {
        if (prevUser) {
          return {
            ...prevUser,
            avatar: user?.avatar,
          };
        }
        return prevUser;
      });

      // Update the avatar information in local storage
      const storedUser = localStorage.getItem("user");
      if (storedUser) {
        const parsedUser = JSON.parse(storedUser);
        localStorage.setItem(
          "user",
          JSON.stringify({
            ...parsedUser,
            avatar: url,
          })
        );
      }

      console.log("User avatar updated successfully");
    } catch (error) {
      console.error("Error updating user avatar:", error);
      // Handle error (e.g., show an error message)
    }
  };

  const handleUploadSuccess = (result: any) => {
    setPublicId(result?.info?.public_id);
    setUploadedImageUrl(result?.info?.secure_url);
    handleImageUpload(result?.info?.secure_url);
  };

  const ProfileContainer = () => {
    return (
      <div className="app__profile-container">
        <table>
          <thead>
            <tr>
              <th>User Information</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                <h4>Avatar:</h4>
                <img
                  src={uploadedImageUrl || user?.avatar}
                  alt={user?.avatar || "No user avatar uploaded"}
                  width={25}
                  height={25}
                />

                {/* Add Handle Update the avatar */}
              </td>
            </tr>
            <tr>
              <td>
                <h4>User Id:</h4>
                {user?.userId}
              </td>
            </tr>
            <tr>
              <td>
                <h4>Email:</h4>
                {user?.email}
              </td>
            </tr>
            <tr>
              <td>
                <h4>First Name:</h4>
                <p>{user?.firstName}</p>
              </td>
            </tr>
            <tr>
              <td>
                <h4>Last Name:</h4>
                <p>{user?.lastName}</p>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    );
  };

  const handleUserUpdate = () => {
    const data = " "; // await updateUserUsingId
  };

  const EditProfileForm = () => {
    return (
      <div>
        <label> Avatar </label>
        {userId && (
          <>
            <img src={user?.avatar || " "} alt={user?.email || "User Photo"} />
            <CloudinaryUploadWidget
              uwConfig={uwConfig}
              setPublicId={setPublicId}
              onSuccess={(result) =>
                handleUploadSuccess(result?.info?.secure_url)
              }
            />
            <form className="app-profile-edit__form">
              <label> First Name </label>
              <input
                id="firstName"
                className=""
                alt=""
                placeholder={user?.firstName || "John"}
                type="text"
              />
              <label> Last Name </label>
              <input
                id="lastName"
                className=""
                alt=""
                placeholder={user?.lastName || "Doe"}
                type="text"
              />
              <label> Email</label>
              <input
                id="email"
                className=""
                alt=""
                placeholder={user?.email || "johndoe@email.com"}
                type="email"
              />
              <input
                id="avatarUrl "
                className=""
                alt=""
                placeholder=""
                type="text"
                hidden
              />
              <hr />
              <button onClick={() => handleUserUpdate()}>
                Update User Info
              </button>
            </form>
          </>
        )}
        {businessId && (
          <>
            <img src={user?.avatar || " "} alt={user?.email || "User Photo"} />
            <CloudinaryUploadWidget
              uwConfig={uwConfig}
              setPublicId={setPublicId}
              onSuccess={(result) =>
                handleUploadSuccess(result?.info?.secure_url)
              }
            />
            <form className="app-profile-edit__form">
              <label> First Name </label>
              <input
                id="firstName"
                className=""
                alt=""
                placeholder={user?.firstName || "John"}
                type="text"
              />
              <label> Last Name </label>
              <input
                id="lastName"
                className=""
                alt=""
                placeholder={user?.lastName || "Doe"}
                type="text"
              />
              <label> Email</label>
              <input
                id="email"
                className=""
                alt=""
                placeholder={user?.email || "johndoe@email.com"}
                type="email"
              />
              <input
                id="avatarUrl "
                className=""
                alt=""
                placeholder=""
                type="text"
                hidden
              />
              <hr />
              <button onClick={() => handleUserUpdate()}>
                Update User Info
              </button>
            </form>
          </>
        )}
      </div>
    );
  };

  const handleEditChange = (isEditing: string) => {
    setIsEditing(isEditing);
  };

  const RadioButtons = () => {
    return (
      <div>
        <h2>{userId ? " User " : " Business "}Profile</h2>
        <div>
          <label>
            <input
              type="radio"
              name=""
              checked={isEditing === "View"}
              value={"View"}
              onChange={() => handleEditChange("View")}
            />
            View
          </label>
          <label>
            <input
              type="radio"
              name="accountType"
              checked={isEditing === "Edit"}
              value="Edit"
              onChange={() => handleEditChange("Edit")}
            />
            Edit
          </label>
        </div>
      </div>
    );
  };

  return (
    <>
      {user?.userId || business?.businessId ? (
        <>
          <Nav total={total} />
          <SearchBar />
          <RadioButtons />

          {isEditing === "View" && <ProfileContainer />}

          {isEditing === "Edit" && <EditProfileForm />}
        </>
      ) : (
        <button onClick={() => (window.location.href = "/login")}>Login</button>
      )}
    </>
  );
}
