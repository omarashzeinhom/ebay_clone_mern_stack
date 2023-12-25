import { useParams } from "react-router-dom";
import { useAuth } from "../../../context/AuthContext";
import { Business } from "../../../models/business";
import { useState } from "react";
import { User } from "../../../models/user";

interface BusinessProfileProps {

};


const BusinessProfile: React.FC<BusinessProfileProps> = ({
    

})=> {

    const {business} = useAuth();
    const { businessId} = useParams();
  
  

    return (
        <div className="app-profile-container__info">
        <table>
          <thead>
            <tr>
              <th>Business Information</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                <h4>Avatar:</h4>
                <img
                  src={""}
                  alt={business?.businessAvatar || "No user avatar uploaded"}
                  width={25}
                  height={25}
                />
              </td>
            </tr>
            <tr>
              <td>
                <h4>Business Id:</h4>
                {business?.businessId}
              </td>
            </tr>
            <tr>
              <td>
                <h4>Email:</h4>
                {business?.businessEmail}
              </td>
            </tr>
            <tr>
              <td>
                <h4>Business Name:</h4>
                <p>{business?.businessName}</p>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    )
}

export default BusinessProfile;