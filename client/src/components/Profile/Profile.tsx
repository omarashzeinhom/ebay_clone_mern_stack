import { useNavigate, useParams } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import Nav from "../Nav/Nav";
import SearchBar from "../SearchBar/SearchBar";

export default function Profile() {
  const { user, business } = useAuth();
  const navigate = useNavigate();
  const { userId, businessId } = useParams();

  // Check if businessId is present in the route parameters
  if (businessId) {
    // You may redirect to the appropriate route or display an error message
    // For example, redirect to the business profile page
    navigate(`/business/${businessId}`);
    // Alternatively, you can display an error message
    // return <p>Invalid business profile</p>;
  }

  return (
    <>
      {userId && (
        <>
          <Nav />
          <SearchBar />
          <div>
            <p>{user?.userId}</p>
            <p>{user?.firstName}</p>
            <p>{user?.lastName}</p>
            <p>{user?.email}</p>
            <img src={user?.avatar} alt="" width={25} height={25} />
          </div>
        </>
      )}

      {businessId && (
        <>
          <Nav />
          <SearchBar />
          <div>
            <h3>{business?.businessName}</h3>
            <p>{business?.businessEmail}</p>
            <img src={"business?.avatar"} alt="" width={25} height={25} />
          </div>
        </>
      )}

      {!business && !user && (
        <>
          <button onClick={() => (window.location.href = "/login")}>
            Login
          </button>
        </>
      )}
    </>
  );
}
