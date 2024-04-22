import { useState } from "react";
import { useBusinessAuth } from "../../../../context/";
import { countryList } from "../../../../utilities/constants";
import { Business, UpdatedBusiness } from "../../../../models";
import "./BusinessProfile.scss";

interface EditBusinessProfileProps {
  business: Business;
  setBusiness: React.Dispatch<React.SetStateAction<Business>>;
  updatedBusiness: UpdatedBusiness | undefined; // New state variable
  setUpdatedBusiness: React.Dispatch<
    React.SetStateAction<UpdatedBusiness | undefined>
  >;
}

const EditBusinessProfile: React.FC<EditBusinessProfileProps> = () => {
  const {
    business,
    updateBusiness,
    updatedBusiness,
    setUpdatedBusiness,
    setBusiness,
  } = useBusinessAuth();
  const [selectedCountry, setSelectedCountry] = useState(
    business?.businessCountry || ""
  );
  const [selectedLocation, setSelectedLocation] = useState(
    business?.businessLocation || ""
  );

  //const businessId = business?.businessId || "";

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

  //TODO Fix Products[] and business.businessCountry;

  return (
    <>
    <h2>Work in Progress:</h2>
      <div className="app-profile-container__form">
        {loading && <p>Loading...</p>}
        {error && <p style={{ color: "red" }}>{error}</p>}
        <form onSubmit={handleSubmit}>
          <div className="app-profile-container__form__group">
            <label>
              Avatar
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
                className="app-profile-container__form__avatar"
                src={business?.businessAvatar || ""}
                alt={
                  `${business?.businessName}  has not uploaded an avatar` ||
                  "Business Photo"
                }
              />
            </label>
            <label>
              {" "}
              Business Name
              <input
                name="updatedFirstName"
                id="businessName"
                className=""
                alt=""
                placeholder={
                  business?.businessName || "Enter company name here"
                }
                type="text"
              />
            </label>

            <label>
              {" "}
              Email
              <input
                name="updatedBusinessEmail"
                id="businessEmail"
                className="app-profile-container__form__group"
                alt=""
                placeholder={
                  business?.businessEmail || "Enter company email here"
                }
                value={updatedBusiness?.updatedBusinessEmail || ""}
                onChange={handleInputChange}
                type="email"
              />
            </label>

            <label>
              Country
              <select
                className="app__nav-right-dropDown"
                value={selectedCountry}
                onChange={(e) => setSelectedCountry(e.target.value)}
              >
                {countryList.map((country, index) => (
                  <option key={index} value={country}>
                    {country}
                  </option>
                ))}
              </select>
            </label>
            <br />
            <label>
              Location
              <select
                className="app__nav-right-dropDown"
                value={selectedLocation}
                onChange={(e) => setSelectedLocation(e.target.value)}
              >
                {countryList.map((country, index) => (
                  <option key={index} value={country}>
                    {country}
                  </option>
                ))}
              </select>
            </label>
            <button hidden={true}  aria-label="UpdateBusinessInformationButton" type="submit">
              {" "}
              Update Business Info
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default EditBusinessProfile;
