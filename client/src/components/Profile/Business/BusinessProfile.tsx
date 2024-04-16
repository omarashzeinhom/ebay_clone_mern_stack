import { useBusinessAuth } from "../../../context/BusinessAuthContext";
 
const BusinessProfile: React.FC = () => {
  const { business } = useBusinessAuth();
  return (
    <div className="user-profile-container">
  <div className="user-profile-header">
    <h2>Business Profile</h2>
  </div>
  <div className="user-profile-info">
    <div className="avatar">
      {business?.businessAvatar ? (
          <img
          rel="preload"
          src={business?.businessAvatar}
          alt={business?.businessEmail || "No business avatar uploaded"}
        />
      ) : (
        <span className="no-avatar">No business avatar uploaded</span>
      )}
    </div>
    <div className="user-details">
      <h3>Business Information</h3>
      <table>
        <tbody>
          <tr>
            <td>Business Id:</td>
            <td>{business?.businessId}</td>
          </tr>
          <tr>
            <td>Email:</td>
            <td>{business?.businessEmail}</td>
          </tr>
          <tr>
            <td>Business Name:</td>
            <td>{business?.businessName}</td>
          </tr>
          <tr>
            <td>Business Location:</td>
            <td>{business?.businessLocation}</td>
          </tr>
          <tr>
            <td>Business Country:</td>
            <td>{business?.businessCountry}</td>
          </tr>
          <tr>
            <td>Business Products:</td>
            <td>{business?.businessProducts}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</div>

  );
};

export default BusinessProfile;
