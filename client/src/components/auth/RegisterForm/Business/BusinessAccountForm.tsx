import React, { ChangeEvent, FormEvent, useState } from "react";
import { Business } from "../../../../models/business";
import "./BusinessAccountForm.scss";
import {
  countryList,
  businessUpdatesFullUploadUri,
} from "../../../../utilities/constants";
import { RegisterBusinessFormData } from "../../../../models/business";
import { businessAuthService } from "../../../../services/businessAuthService";

interface BusinessAccountFormProps {
  business: Business;
  handleRegister: () => void;
  setBusiness: React.Dispatch<React.SetStateAction<Business>>;
}

const BusinessAccountForm: React.FC<BusinessAccountFormProps> = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [formData, setFormData] = useState<RegisterBusinessFormData>({
    businessId: "",
    businessName: "",
    businessEmail: "",
    businessPassword: "",
    businessAvatar: "",
    businessActive: true,
    businessLocation: "",
    businessCountry: "",
    businessProducts: [],

  });


  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      setLoading(true);
      setError(null);

      // Upload the image file to Cloudinary
      const cloudinaryFormData = new FormData();
      cloudinaryFormData.append("file", formData.businessAvatar as File);
      cloudinaryFormData.append(
        "upload_preset",
        `${process.env.REACT_APP_CLODUINARY_BUSINESS_AVATARS_UPLOAD_PRESET}`
      );

      const cloudinaryResponse = await fetch(businessUpdatesFullUploadUri, {
        method: "POST",
        body: cloudinaryFormData,
      });

      if (!cloudinaryResponse.ok) {
        const errorDetails = await cloudinaryResponse.json();
        console.error("Cloudinary API Error:", errorDetails);
        throw new Error("Failed to upload image to Cloudinary");
      }

      const cloudinaryData = await cloudinaryResponse.json();
      const cloudinaryImageUrl = cloudinaryData.secure_url;

      // Store the Cloudinary URL in MongoDB
      const businessData = {
        businessId: formData?.businessId,
        businessName: formData?.businessName,
        businessEmail: formData.businessEmail,
        businessPassword: formData.businessPassword,
        businessAvatar: cloudinaryImageUrl,
        businessActive: formData?.businessActive,
        businessLocation: formData.businessLocation,
        businessCountry: formData.businessCountry,
        businessProducts: [],
      };

      console.log("businessData====>" + businessData);

      // Call your backend service to store the product data in MongoDB
      const data = await businessAuthService.registerBusiness({
        businessId: formData?.businessId,
        businessName: formData?.businessName,
        businessEmail: formData?.businessEmail,
        businessPassword: formData?.businessPassword,
        businessAvatar: cloudinaryImageUrl,
        businessActive: formData?.businessActive,
        businessLocation: formData?.businessLocation,
        businessCountry: formData?.businessCountry,
        businessProducts: [], //Object literal may only specify known properties, and 'businessProducts' does not exist in type
      });


      console.log("Business created:", data);

      // Resetting the form after successful submission
      setFormData((prevState: any) => ({
        ...prevState,
        businessAvatar: "", // Reset img property to an empty string
      }));
    } catch (error) {
      console.error("Error creating Business:", error);
      setError("Failed to create the Business. Please try again.");
    } finally {
      setLoading(false);
    }
  };
  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>,
    fieldName: string
  ) => {
    if (
      fieldName === "businessAvatar" &&
      e.target &&
      e.target instanceof HTMLInputElement &&
      e.target.files
    ) {
      const inputElement = e.target as HTMLInputElement;
      setFormData((prevState: any) => ({
        ...prevState,
        [fieldName]: inputElement.files![0],
      }));
    } else {
      const { name, value } = e.target;
      setFormData((prevState: any) => ({
        ...prevState,
        [name]: value,
      }));
    }
  };
  return (
    <form className="app__baform" onSubmit={handleSubmit}>
      {loading && <p>Loading...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}
      <label>
        {" "}
        <em>Business Id:</em>
        <input
          name="businessName"
          type="text"
          hidden
          className="app__baform-input"
          onChange={(e) => handleChange(e, "businessId")}
        />
      </label>

      <label>
        {" "}
        <em>Business Name:</em>
        <input
          name="businessName"
          type="text"
          required
          placeholder="Business Name"
          className="app__baform-input"
          onChange={(e) => handleChange(e, "businessName")}
        />
      </label>

      <label>Business Email</label>
      <input
        type="email"
        name="businessEmail"
        required
        autoComplete="businessEmail"
        placeholder="BusinessEmail"
        className="app__baform-input"
        onChange={(e) => handleChange(e, "businessEmail")}
      />
      <label>
        Business Password:
        <input
          type="password"
          name="businessPassword"
          placeholder="Business Password"
          className="app__baform-input"
          autoComplete="current-businessPassword"
          onChange={(e) => handleChange(e, "businessPassword")}
        />
      </label>

      <label>
        Business Avatar
        <input
          placeholder="Upload Business Avatar Image Here"
          name="businessAvatar"
          type="file"
          accept="image/*"
          onChange={(e) => handleChange(e, "businessAvatar")}
        />
        <input
          type="text"
          name="businessAvatar"
          placeholder="Business Avatar"
          className="app__baform-input"
          hidden
          onChange={(e) => handleChange(e, "businessAvatar")}
        />
      </label>
      <label>
        Is your Business going to be Actively Selling Products ?
        <select onChange={(e) => handleChange(e, "businessActive")}>
          <option> Yes</option>
          <option> No</option>
        </select>
        <input
          hidden
          type="boolean"
          name="businessActive"
          placeholder="BusinessActive"
          className="app__baform-input"
          onChange={(e) => handleChange(e, "businessActive")}
        />
      </label>
      <label>
        Business Products
        <details>
          Can Be Assigned At <a href="/sell">Sell</a> After finishing Business
          Registration and confirmation
        </details>
        <input
          type="array"
          name="businessProducts"
          placeholder="BusinessProducts"
          className="app__baform-input"
          hidden
          onChange={(e) => handleChange(e, "businessProducts")}
        />
      </label>
      <label>
        <strong>Business Location:</strong>
        <select
          typeof="string"
          name="businessLocation"
          className="app__baform-input"
          onChange={(e) => handleChange(e, "businessLocation")}
        >
          {countryList.map((country, index) => {
            return <option key={index}>{country}</option>;
          })}
        </select>
      </label>
      <label>
        <strong>Business Country:</strong>
        <select
          typeof="string"
          name="businessCountry"
          className="app__baform-input"
          onChange={(e) => handleChange(e, "businessCountry")}
        >
          {countryList.map((country, index) => {
            return <option key={index}>{country}</option>;
          })}
        </select>
      </label>

      <button aria-label="BusinessRegisterButton" className="app__baform-Btn">
        Register Business
      </button>
    </form>
  );
};

export default BusinessAccountForm;
