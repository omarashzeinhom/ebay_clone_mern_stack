import { useAuth } from "../../../context/AuthContext";

export default function UserProfile() {
  const { user } = useAuth();
  console.log(`user in UserProfile.tsx =====> ${user}`);


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
              {user?.avatar ? (
                // If avatar is a string (URL), display the image
                <img
                  src={user.avatar as string}
                  alt={user?.email || "No user avatar uploaded"}
                  width={25}
                  height={25}
                />
              ) : (
                // If avatar is a File, you might want to handle this case differently
                // For example, you could display a message or placeholder image
                <span>No user avatar uploaded</span>
              )}
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
}
