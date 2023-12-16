import { useAuth } from "../../context/AuthContext";
import Nav from "../Nav/Nav";
import SearchBar from "../SearchBar/SearchBar";

export default function Profile() {
  const { user, business } = useAuth();

  return (
    <>
      {user != null && (
        <>
          <Nav />
          <SearchBar />
          <div>
            <p>{user?.firstName}</p>
            <p>{user?.lastName}</p>
            <p>{user?.email}</p>
            <img src="{`user?.avatar`}" alt="" width={25} height={25} />
          </div>
        </>
      )}

      {business && (
        <>
          <Nav />
          <SearchBar />
          <div>
            <h3>{business?.businessName}</h3>
            <p>{business?.businessEmail}</p>
            <img src="{`business?.avatar`}" alt="" width={25} height={25} />
          </div>
        </>
      )}

      {business ||
        user === null ||
        (undefined && (
          <>
            <button onClick={() => (window.location.href = "/login")}>
              Login
            </button>
          </>
        ))}
    </>
  );
}
