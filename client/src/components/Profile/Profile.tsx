import { useParams } from "react-router-dom";
import "./Profile.scss";
import { useAuth } from "../../context/AuthContext";
import Nav from "../Nav/Nav";
import SearchBar from "../SearchBar/SearchBar";
import { useState } from "react";
import UserProfile from "./User/UserProfile";
import BusinessProfile from "./Business/BusinessProfile";
import EditUserProfile from "./User/EditUserProfile";
import EditBusinessProfile from "./Business/EditBusinessProfile";

type ProfileProps = {
  total: number;
};

export default function Profile({ total }: ProfileProps) {
  const [isEditing, setIsEditing] = useState("View");
  const {
    business,
    user,
    setUser,
    updateUser,
    updatedUser,
    setUpdatedUser /* token  */,
  } = useAuth();
  const { businessId, userId } = useParams();

  const businessB = localStorage.getItem("business");
  console.log(businessB);

  const ProfileContainer = () => {
    if (user?.userId || userId) {
      return <UserProfile />;
    } else if (business?.businessId || businessId) {
      return <BusinessProfile />;
    } else {
      return null;
    }
  };

  const EditProfileForm = () => {
    return (
      <div>
        {user?.userId && (
          <EditUserProfile
            user={user}
            setUser={() => setUser}
            updatedUser={updatedUser}
            setUpdatedUser={() => setUpdatedUser}
            updateUser={async (selectedAvatar) =>
              updateUser(selectedAvatar, updatedUser)
            }
          />
        )}
        {business?.businessId && <EditBusinessProfile />}
      </div>
    );
  };

  const handleEditChange = (isEditing: string) => {
    setIsEditing(isEditing);
  };

  const RadioButtons = () => {
    return (
      <div className="radio-buttons-container">
        <h2>{userId ? "User" : "Business"} Profile</h2>
        <div className="radio-buttons">
          <label className="radio-button">
            <input
              type="radio"
              name=""
              checked={isEditing === "View"}
              value={"View"}
              onChange={() => handleEditChange("View")}
            />
            <span className="radio-label">View</span>
          </label>
          <label className="radio-button">
            <input
              type="radio"
              name="accountType"
              checked={isEditing === "Edit"}
              value="Edit"
              onChange={() => handleEditChange("Edit")}
            />
            <span className="radio-label">Edit</span>
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
          <div className="app-profile-container">
            {isEditing === "View" && <ProfileContainer />}

            {isEditing === "Edit" && <EditProfileForm />}
          </div>
        </>
      ) : (
        <>
          <Nav total={total} />
          <SearchBar />
          <div className="app-profile-container">
            <button onClick={() => (window.location.href = "/signin")}>
              Sign In{" "}
            </button>
          </div>
        </>
      )}
    </>
  );
}
