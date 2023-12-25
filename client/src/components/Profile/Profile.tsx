import { useParams } from "react-router-dom";
import "./Profile.scss";
import { useAuth } from "../../context/AuthContext";
import Nav from "../Nav/Nav";
import SearchBar from "../SearchBar/SearchBar";
import { useState } from "react";
import UserProfile from "./User/UserProfile";
import BusinessProfile from "./Business/BusinessProfile";
import EditUserProfile from "./User/EditUserProfile";

type ProfileProps = {
  total: number;
};

export default function Profile({ total }: ProfileProps) {
  const [isEditing, setIsEditing] = useState("");
  const { business, user } = useAuth();
  const { businessId, userId } = useParams();

  const ProfileContainer = () => {
    if (user?.userId || userId) {
      return <UserProfile />;
    } else if (business?.businessId || businessId) {
      return <BusinessProfile />;
    }
  };

  const EditProfileForm = () => {
    return (
      <div>
        {user?.userId && <EditUserProfile />}
        {business?.businessId && <BusinessProfile />}
      </div>
    );
  };

  const handleEditChange = (isEditing: string) => {
    setIsEditing(isEditing);
  };

  const RadioButtons = () => {
    return (
      <div className="app-profile-container">
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
          <div className="app-profile-container">
            {isEditing === "View" && <ProfileContainer />}

            {isEditing === "Edit" && <EditProfileForm />}
          </div>
        </>
      ) : (
        <button onClick={() => (window.location.href = "/login")}>Login</button>
      )}
    </>
  );
}
