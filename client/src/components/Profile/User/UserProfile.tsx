import { useAuth } from "../../../context/AuthContext";
import { authService } from "../../../services/authService";
import "./UserProfile.scss";

export default function UserProfile() {
  const { user, updatedUser } = useAuth();

  return (
    <div className="user-profile-container">
      <div className="user-profile-header">
        <h2>User Profile</h2>
      </div>
      <div className="user-profile-info">
        <div className="avatar">
          {updatedUser?.updatedAvatar || user?.avatar ? (
            <img
              src={user?.avatar as string || updatedUser?.updatedAvatar}
              alt={user?.email || updatedUser?.updatedEmail || "No user avatar uploaded"}
            />
          ) : (
            <span className="no-avatar">No user avatar uploaded</span>
          )}
        </div>
        <div className="user-details">
          <h3>User Information</h3>
          <table>
            <tbody>
              <tr>
                <td>User Id:</td>
                <td>{user?.userId}</td>
              </tr>
              <tr>
                <td>Email:</td>
                <td>{updatedUser?.updatedEmail || user?.email}</td>
              </tr>
              <tr>
                <td>First Name:</td>
                <td>{updatedUser?.updatedFirstName || user?.firstName}</td>
              </tr>
              <tr>
                <td>Last Name:</td>
                <td>{updatedUser?.updatedLastName || user?.lastName}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
