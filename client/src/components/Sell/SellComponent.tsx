import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { HOME_URL } from "../../utilities/constants";
import { CreateProduct, ReadProduct } from "./CRUD";

export default function SellComponent () {
    const { user, business } = useAuth();
    const navigate = useNavigate(); // Access the navigate function

    const [selectedBtn, setSelectedBtn] = useState("");
    const handleBtnChange = (selectedButton: string) => {
    setSelectedBtn(selectedButton);
    // Redirect to the /sell route
    navigate("/sell");
  };
    const signInLink = `${HOME_URL}/signin`;
    return (
      <>
         {!business?.businessId && (
          <>
            <h2>
              If No Business is Logged In Please
              <a href={signInLink}> SignIn</a>
            </h2>
          </>
        )}
        {user?.userId && (
          <>
            <h2>Sell</h2>
            <h2>
              Register your <Link to="/register">business</Link> to start selling
            </h2>
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
        {selectedBtn === "View Products" && <ReadProduct />}
        
      </>
    )
  }
  
  const SellButtons = [
    {
      title: "Create Product",
      link: "",
      element: <CreateProduct />,
    },
    {
      title: "View Products",
      link: "",
      element: <ReadProduct />,
    },
    
  ];