import { useState } from "react";
import { FaRegBell } from "react-icons/fa";
import { TbShoppingCart } from "react-icons/tb";
import { navItems, myEbayItems } from "../../utils/constants";
import "./Nav.scss";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom"; // Import useNavigate

const Nav = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { token, user, logout } = useAuth();
  //console.log(user, token, logout);
  const navigate = useNavigate(); // Initialize useNavigate

  const handleLogOut = () => {
    logout();
  };

  const handleMobileMenuToggle = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };
  const handleUserRoute = () => {
    // Redirect to /user/${user?.userId} route
    navigate(`/user/${user?.userId}`);
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
              className="app__nav-dropdown"
              onChange={(e) => {
                if (e.target.value === "logout") {
                  handleLogOut();
                } else {
                  navigate(`/user/${user?.userId}`);
                }
              }}
            >
              <option value="">Hi, {user?.email || user?.userId}!</option>
              <option onClick={handleUserRoute}>{user?.userId || " "}!</option>
              <option value="logout" className="">
                Sign out
              </option>
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
            </a>
          </li>
        </div>
      </ul>
    </nav>
  );
};

export default Nav;
