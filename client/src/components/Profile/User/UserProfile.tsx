import { useAuth } from "../../../context/AuthContext";
import {authService} from "../../../services/authService";



export default function UserProfile() {
  const { user, updatedUser } = useAuth();
  console.log(`user in UserProfile.tsx =====> ${JSON.stringify(user)}`);
  const token: string | null | any = localStorage.getItem('token');
  console.log(token
    )

  console.log(`authService.getUser(token)---->${JSON.stringify(authService.getUser(token))}`);
  

  //console.log(`useAuth().fetchUserInformation----->${JSON.stringify(useAuth().fetchUserInformation)}`);

 
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
              {updatedUser?.updatedAvatar || user?.avatar ? (
                // If avatar is a string (URL), display the image
                <img
                  src={user?.avatar as string || updatedUser?.updatedAvatar}
                  alt={user?.email || updatedUser?.updatedEmail ||"No user avatar uploaded"}
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
              {user?.userId }
            </td>
          </tr>
          <tr>
            <td>
              <h4>Email:</h4>
              {updatedUser?.updatedEmail || user?.email}
            </td>
          </tr>
          <tr>
            <td>
              <h4>First Name:</h4>
              <p>{updatedUser?.updatedFirstName ||user?.firstName}</p>
            </td>
          </tr>
          <tr>
            <td>
              <h4>Last Name:</h4>
              <p>{updatedUser?.updatedLastName ||user?.lastName}</p>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
