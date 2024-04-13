import { useState } from "react";
import { useAuth } from "../../../context/AuthContext";
import { countryList } from "../../../utilities/constants";

export default function EditBusinessProfile() {
  const {
    business,
    updateBusiness,
    updatedBusiness,
    setUpdatedBusiness,
    setBusiness,
  } = useAuth();

  const [selectedAvatar, setSelectedAvatar] = useState<File | undefined>(
    undefined
  );
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUpdatedBusiness((prevData: any) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleFileChange = (file: File | undefined) => {
    setSelectedAvatar(file);
    if (file) {
      console.log(`File selected: ${file.name}`);
    } else {
      console.log("No file selected");
    }
  };

  const handleSubmit = async (event: React.FormEvent) => {
    try {
      setLoading(true);
      setError(null);
      event.preventDefault();

      // Check if the updated user data is different from the previous user data
      if (
        updatedBusiness &&
        (updatedBusiness.updatedBusinessName !== business?.businessName ||
          updatedBusiness.updatedBusinessEmail !== business?.businessEmail ||
          updatedBusiness.updatedBusinessAvatar !== business?.businessAvatar)
      ) {
        await updateBusiness(selectedAvatar, updatedBusiness);
        setBusiness(
          (prevBusiness: {
            businessEmail: string;
            businessName: string;
            businessAvatar: string;
          }) => ({
            ...prevBusiness,
            businessName:
              updatedBusiness.updatedBusinessName || prevBusiness.businessName,
            email:
              updatedBusiness.updatedBusinessEmail ||
              prevBusiness.businessEmail,
            avatar:
              updatedBusiness.updatedBusinessAvatar ||
              prevBusiness.businessAvatar,
          })
        );
        setUpdatedBusiness(undefined); // Reset updatedBusinessafter successful update
      } else {
        console.log("User data has not changed. No update required.");
      }
    } catch (error) {
      console.error("Error updating user:", error);
      setError("Failed to update the user. Please try again."); // Set an appropriate error message
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="app-profile-container__form">
        {loading && <p>Loading...</p>}
        {error && <p style={{ color: "red" }}>{error}</p>}
        <form onSubmit={handleSubmit}>
          <div className="app-profile-container__form__group">
            <label> Business Name </label>
            <input
              name="updatedFirstName"
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
              name="updatedBusinessEmail"
              id="businessEmail"
              className=""
              alt=""
              placeholder={
                business?.businessEmail || "Enter company email here"
              }
              value={updatedBusiness?.updatedBusinessEmail || ""}
              onChange={handleInputChange}
              type="email"
            />
          </div>

          <div className="app-profile-container__form__group">
            <label>Avatar</label>
            <input
              name="updatedBusinessAvatar"
              id="businessAvatar"
              className=""
              alt={business?.businessName || ""}
              placeholder={business?.businessAvatar || ""}
              type="file"
              onChange={(e) => handleFileChange(e.target.files?.[0])}
            />
              <img
              rel="preload"
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
