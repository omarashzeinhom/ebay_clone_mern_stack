import { useParams } from "react-router-dom";
import "./Profile.scss";
import { useAuth } from "../../context/AuthContext";
import Nav from "../Nav/Nav";
import SearchBar from "../SearchBar/SearchBar";
import { useState } from "react";
import { countryList } from "../../utilities/constants";

type ProfileProps = {
  total: number;
};

export default function Profile({ total }: ProfileProps) {
  const [isEditing, setIsEditing] = useState("");
  const { user, business, token, updateUser } = useAuth();
  const { businessId, userId } = useParams();

  const ProfileContainer = () => {
    if (user?.userId || userId) {
      return (
        <div className="app-profile-container__info">
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
                    src={user?.avatar || "No user avatar uploaded"}
                    alt={user?.avatar || "No user avatar uploaded"}
                    width={25}
                    height={25}
                  />
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
    } else if (business?.businessId || businessId) {
      return (
        <div className="app-profile-container__info">
          <table>
            <thead>
              <tr>
                <th>Business Information</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>
                  <h4>Avatar:</h4>
                  <img
                    src={""}
                    alt={user?.avatar || "No user avatar uploaded"}
                    width={25}
                    height={25}
                  />
                </td>
              </tr>
              <tr>
                <td>
                  <h4>Business Id:</h4>
                  {business?.businessId}
                </td>
              </tr>
              <tr>
                <td>
                  <h4>Email:</h4>
                  {business?.businessEmail}
                </td>
              </tr>
              <tr>
                <td>
                  <h4>Business Name:</h4>
                  <p>{business?.businessName}</p>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      );
    }
  };

  const handleUserUpdate = () => {
    //const data = " "; // await updateUserUsingId
  };

  const EditProfileForm = () => {
    return (
      <div>
        {userId && (
          <div className="app-profile-container__form">
            <form>
              <div className="app-profile-container__form__group">
                <label> First Name </label>
                <input
                  id="firstName"
                  className=""
                  alt=""
                  placeholder={user?.firstName || "John"}
                  type="text"
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
                />
              </div>
              <div className="app-profile-container__form__group">
                <small></small>
                <img
                  src={user?.avatar || " "}
                  alt={user?.email || "User Photo"}
                />
              </div>
              <div className="app-profile-container__form__group">
                <label> Avatar </label>
                <input
                  id="avatarUrl "
                  className=""
                  alt={user?.avatar || user?.email || "User Avatar"}
                  placeholder=""
                  type="file"
                />
              </div>
              <hr />
              <button
                onClick={() => {
                  if (token !== null && user !== null) {
                    updateUser(token, user);
                  } else {
                    // Handle the case where token is null, e.g., show an error message or take appropriate action
                  }
                }}
              >
                Update User
              </button>
            </form>
          </div>
        )}
        {business?.businessId && (
          <div className="app-profile-container__form">
            <form>
              <div className="app-profile-container__form__group">
                <label> Business Name </label>
                <input
                  id="businessName"
                  className=""
                  alt=""
                  placeholder={business?.businessEmail || "John Doe Inc"}
                  type="text"
                />
              </div>
              <div className="app-profile-container__form__group">
                <label> Email </label>
                <input
                  id="businessEmail"
                  className=""
                  alt=""
                  placeholder={
                    business?.businessEmail || "johndoeinc@email.com"
                  }
                  type="email"
                />
              </div>
              <div className="app-profile-container__form__group">
                <label> Active ? </label>
                <input
                  id="businessEmail"
                  className=""
                  alt=""
                  placeholder={business?.businessEmail || ""}
                  type="email"
                />
                {business?.businessActive}
              </div>
              <div className="app-profile-container__form__group">
                <label> Avatar </label>
                <input
                  id="businessAvatar"
                  className=""
                  alt={business?.businessName || ""}
                  placeholder={business?.businessAvatar || ""}
                  type="file"
                />
                <img
                  src={business?.businessAvatar || ""}
                  alt={
                    business?.businessName ||
                    business?.businessEmail ||
                    "Business Photo"
                  }
                />
              </div>
              <select>
                {countryList.map((country, index) => {
                  return (
                    <option key={country || index}>{country}</option>
                  );
                })}
              </select>
              <button onClick={() => handleUserUpdate()}>
                Update Business Info
              </button>
            </form>
          </div>
        )}
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
