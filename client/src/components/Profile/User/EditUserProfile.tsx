import { useAuth } from "../../../context/AuthContext"
import { useParams } from "react-router-dom"

export default function EditUserProfile(){
    const {user}= useAuth();

    return (
        <>
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
         // onChange={(e) => handleChange("firstName", e.target.value)}
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
                 // onChange={(e) => handleChange("lastName", e.target.value)}

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
                 // onChange={(e) => handleChange("email", e.target.value)}

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
                 // onChange={(e) => handleChange("avatar", e.target.value)}

                />
              </div>
              <hr />
              <button
                onClick={() => {}} >
                Update User
              </button>
            </form>
          </div>
        </>
    )
}