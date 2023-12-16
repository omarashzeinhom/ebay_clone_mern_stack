import "./Nav.scss";
import { FaRegBell } from "react-icons/fa";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { TbShoppingCart } from "react-icons/tb";
//import { Business } from "../../models/business";
import { useAuth } from "../../context/AuthContext";
//import { authService } from "../../services/authService";
import { navItems, myEbayItems } from "../../utilities/constants";
import ShoppingCart from "../Cart/ShoppingCart/ShoppingCart";

const Nav = () => {
  const { token, user, logout,business } = useAuth();
  //const [business, setBusiness] = useState<Business>();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navigate = useNavigate();

  const handleLogOut = () => {
    logout();
    localStorage.removeItem("business");
    localStorage.removeItem("user");
    if (user) {
      alert(" User has Logout successfully");
    } else {
      if (business) {
        alert(" Business has Logout successfully");
      }
    }
    navigate(`/`);
  };

  const handleMobileMenuToggle = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const handleRoute = () => {
    if (user?.userId !== undefined) {
      navigate(`/user/${user?.userId}`);
    } else if (business?.businessId !== undefined) {
      navigate(`/business/${business?.businessId}`);
    } else {
      console.error("User and business have no ID");
    }
  };



  return (
    <nav className={`app__nav ${mobileMenuOpen ? "mobile-menu-open" : ""}`}>
      <div className="app__nav-mobile-icon" onClick={handleMobileMenuToggle}>
        ☰
      </div>
      <ul
        className={`app__nav-items ${mobileMenuOpen ? "mobile-menu-open" : ""}`}
      >
        <div className="app__nav-left">
          {token ? (
            <select
              id="categoriesDropDown"
              className="app__nav-dropdown"
              onChange={(e) => {
                if (e.target.value === "logout") {
                  handleLogOut();
                } else {
                  navigate(`/user/${user?.userId}`);
                }
              }}
            >
              <option value="">
                Hi,{" "}
                {business?.businessName ||
                  user?.firstName ||
                  business?.businessEmail ||
                  user?.email ||
                  "User"}
                !
              </option>
              <option onClick={handleRoute}>
                {user?.userId?.slice(1, 7) ||
                  `${business?.businessName.slice(0, 5)}
                 ${business?.businessId?.slice(1, 10)}` ||
                  " "}
                !
              </option>
              <option value="logout">Sign out</option>
            </select>
          ) : (
            <li>
              Hi! <a href="/signin">Sign in</a> or{" "}
              <a href="/register">register</a>
            </li>
          )}
        </div>
        {navItems.map((item, index) => (
          <li key={index}>
            <a href={item?.link} className="app__nav-item">
              {item?.title}
            </a>
          </li>
        ))}
        <button
          className={`app__nav-close ${
            mobileMenuOpen ? "mobile-menu-open" : ""
          }`}
          onClick={handleMobileMenuToggle}
        >
          &times;
        </button>
        <div className="app__nav-right">
          <li className="app__nav-rightItem">
            <a href="/sell">Sell</a>
          </li>
          <li>
            <select
              defaultValue={"My Ebay"}
              className="app__nav-right-dropDown"
              id="MyEbay"
            >
              <option hidden>My Ebay</option>
              {myEbayItems.map((ebayItem, index) => (
                <option key={index} id={ebayItem?.title}>
                  {ebayItem?.title}
                </option>
              ))}
            </select>
          </li>
          <li className="app__nav-rightItem">
            <a href="#notifications">
              <FaRegBell className="app__nav-rightIcon" />
            </a>
          </li>
          <li className="app__nav-rightItem">
            <a href="#shoppingcart">
              <TbShoppingCart className="app__nav-rightIcon" />
              <ShoppingCart isOpen={false}/>
            </a>
          </li>
        </div>
      </ul>
    </nav>
  );
};

export default Nav;
