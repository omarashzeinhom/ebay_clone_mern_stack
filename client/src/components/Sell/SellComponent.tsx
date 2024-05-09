import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useBusinessAuth, useUserAuth } from "../../context/";
import { signInLink } from "../../utilities/constants";
import { CreateProduct, ReadProduct } from "./CRUD";
import "./SellComponent.scss";
import CreateAuctionProduct from "./CRUD/CreateAuctionProduct/CreateAuctionProduct";

export default function SellComponent () {
    const { user,userToken } = useUserAuth();
    const {  business,businessToken } = useBusinessAuth();

    const navigate = useNavigate(); // Access the navigate function

    const [selectedBtn, setSelectedBtn] = useState("");
    const handleBtnChange = (selectedButton: string) => {
    setSelectedBtn(selectedButton);
    // Redirect to the /sell route
    navigate("/sell");
  };

    //DEBUGGING
    //console.log("user===>" +user);
    //console.log("business===>" + business);
    return (
      <>
         {!userToken && !businessToken && (
          <>
            <h2>
              Hi There , Kindly  <a href={signInLink}>Sign In</a>as Business to Start Selling              
            </h2>
           
          </>
        )}
        {user?.userId && (
          <>
            <h2>Sell</h2>
<h3>Hi there, {user?.firstName || user?.email || "User"}</h3>
            <h4>
              Kindly , Register your <Link to="/register">Business Account as a seperate account</Link> to start selling
            </h4>
          </>
        )}
  
        {business?.businessId != null && (
          <>
            <h2>Sell</h2>
            {SellButtons.map((sellBtn, index) => {
              return (
                <label key={index}>
                  <input
                    type="radio"
                    value={sellBtn?.title}
                    placeholder={sellBtn?.title}
                    checked={selectedBtn === `${sellBtn?.title}`}
                    onChange={() => handleBtnChange(`${sellBtn?.title}`)}
                  />
                  {sellBtn?.title}
                </label>
              );
            })}
          </>
        )}
  
        {selectedBtn === "Create Product" && <CreateProduct />}
        {selectedBtn === "Create Auction Product" && <CreateAuctionProduct />}
        {selectedBtn === "View Products" && <ReadProduct />}
        
      </>
    )
  }
  
  const SellButtons = [
    {
      title: "Create Product",
      element: <CreateProduct />,
    },
    {
      title: "Create Auction Product",
      element: <CreateAuctionProduct />,
    },
    {
      title: "View Products",
      element: <ReadProduct />,
    },
    
  ];