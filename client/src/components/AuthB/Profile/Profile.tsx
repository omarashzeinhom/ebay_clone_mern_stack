import { useParams } from "react-router-dom";
import "./Profile.scss";
import { Nav } from "../../";
import SearchBar from "../../SearchBar/SearchBar";
import { useState } from "react";

import { useUserAuth, useBusinessAuth } from "../../../context/";

import BusinessProfile from "../Profile/Business/BusinessProfile";
import EditBusinessProfile from "../Profile/Business/EditBusinessProfile";
import EditUserProfile from "../Profile/User/EditUserProfile";
import UserProfile from "../Profile/User/UserProfile";

type ProfileProps = {
  total: number;
};

export default function Profile({ total }: ProfileProps) {
  const [isEditing, setIsEditing] = useState("View");
  const { user, setUser, updatedUser, setUpdatedUser } = useUserAuth();
  const { business, setBusiness, setUpdatedBusiness, updatedBusiness } =
    useBusinessAuth();

  const { businessId, userId } = useParams();

  const businessB = localStorage.getItem("business");
  const userB = localStorage.getItem("user");

  const businessStr = JSON.stringify(business);
  const userStr = JSON.stringify(user);
  if (businessId !== undefined) {
    console.log(`
    ************************
    Business - Debug
    ************************
    1. business---> ${businessStr} 
    ************************
    2. businessB(WithLocalStorage)--->${businessB}
    ************************
    3. businessId-->${businessId}
    ************************** 
    `);
  } else if (userId !== null) {
    console.log(`
    ************************
    User - Debug
    ************************
    1. user---> ${userStr} 
    ************************
    2. userB(WithLocalStorage)--->${userB}
    ************************
    3. userId-->${userId}
    ************************** 
    `);
  } else {
    console.warn(
      `No User Logged In - Please Login with demo credentials to test all features`
    );
  }

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
            setUser={setUser}
            updatedUser={updatedUser}
            setUpdatedUser={setUpdatedUser}
          />
        )}
        {business?.businessId && (
          <EditBusinessProfile
            business={business}
            setBusiness={setBusiness}
            updatedBusiness={updatedBusiness}
            setUpdatedBusiness={setUpdatedBusiness}
          />
        )}
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
            <button
              aria-label="GoToSignInPageButton"
              onClick={() => (window.location.href = "/signin")}
            >
              Sign In{" "}
            </button>
          </div>
        </>
      )}
    </>
  );
}
