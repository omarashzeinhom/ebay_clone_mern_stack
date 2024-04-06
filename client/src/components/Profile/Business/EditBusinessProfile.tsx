import { useAuth } from "../../../context/AuthContext";
import { countryList } from "../../../utilities/constants";

export default function EditBusinessProfile() {
  const { business /* updateBusiness, updatedBusiness  */ } = useAuth();

  return (
    <>
      <div className="app-profile-container__form">
        <form>
          <div className="app-profile-container__form__group">
            <label> Business Name </label>
            <input
              id="businessName"
              className=""
              alt=""
              placeholder={business?.businessName || "Enter company name here"}
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
                business?.businessEmail || "Enter company email here"
              }
              type="email"
            />
          </div>

          <div className="app-profile-container__form__group">
            <label>Avatar</label>
            <input
              id="businessAvatar"
              className=""
              alt={business?.businessName || ""}
              placeholder={business?.businessAvatar || ""}
              type="file"
            />
            <img
              loading="lazy"
              src={business?.businessAvatar || ""}
              alt={
                `${business?.businessName}  has not uploaded an avatar` ||
                "Business Photo"
              }
            />
          </div>
          <select>
            {countryList.map((country, index) => {
              return <option key={country || index}>{country}</option>;
            })}
          </select>
          <button type="submit"> Update Business Info</button>
        </form>
      </div>
    </>
  );
}
