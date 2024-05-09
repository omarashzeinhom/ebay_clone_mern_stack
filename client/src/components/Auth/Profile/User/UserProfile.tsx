import { useUserAuth } from "../../../../context/";
import "./UserProfile.scss";

export default function UserProfile() {
  const { user, updatedUser } = useUserAuth();
  console.log(user);

  return (
    <div className="user-profile-container">
      <div className="user-profile-header">
        <h2>User Profile</h2>
      </div>
      <div className="user-profile-info">
        <div className="avatar">
          { user?.avatar ? updatedUser?.avatar || (
              <img
               loading="lazy"
              src={user?.avatar || updatedUser?.avatar }
              alt={user?.email || updatedUser?.email || "No user avatar uploaded"}
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
                <td>{updatedUser?.email || user?.email}</td>
              </tr>
              <tr>
                <td>First Name:</td>
                <td>{updatedUser?.firstName || user?.firstName}</td>
              </tr>
              <tr>
                <td>Last Name:</td>
                <td>{updatedUser?.lastName || user?.lastName}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
